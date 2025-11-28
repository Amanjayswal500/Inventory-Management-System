/*
LinearRegressionInventoryComponent.jsx
A single-file React component (Create React App) that trains a simple linear regression
model using TensorFlow.js to predict future inventory demand (or sales) based on a
single numeric feature (e.g., past month's sales, lead time, price, etc.).

Features:
- Paste CSV data or use sample data
- Train a simple linear regression model (y = wx + b)
- Show loss during training
- Visualize actual vs predicted with a line chart (react-chartjs-2 + chart.js)
- Export / Import model (browser localstorage)

Install these dependencies in your CRA project before using:

npm install @tensorflow/tfjs chart.js react-chartjs-2

Usage: place this file in src/components and import in your app, e.g.
import LinearRegressionInventory from './components/LinearRegressionInventoryComponent';

Then include <LinearRegressionInventory /> in your App.

*/

import React, { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LinearRegressionInventory() {
  // Simple sample inventory dataset (feature: past_month_sales, label: demand_next_month)
  const sampleData = `past_sales,demand\n10,12\n20,19\n30,29\n40,40\n50,49\n60,62\n70,68\n80,81\n90,89\n100,99`;

  const [csvText, setCsvText] = useState(sampleData);
  const [data, setData] = useState(null);
  const [trained, setTrained] = useState(false);
  const [lossHistory, setLossHistory] = useState([]);
  const [predictionInput, setPredictionInput] = useState('110');
  const [predictionResult, setPredictionResult] = useState(null);
  const modelRef = useRef(null);

  function parseCSV(text) {
    // expects header: feature,label  e.g. past_sales,demand
    const lines = text.trim().split(/\r?\n/).map(l=>l.trim()).filter(l=>l.length>0);
    if (lines.length < 2) return null;
    const header = lines[0].split(',').map(h=>h.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(v=>parseFloat(v.trim())));
    const xs = rows.map(r => r[0]);
    const ys = rows.map(r => r[1]);
    return { xs, ys, header };
  }

  function prepareTensors(xsRaw, ysRaw) {
    const xs = tf.tensor2d(xsRaw, [xsRaw.length, 1]);
    const ys = tf.tensor2d(ysRaw, [ysRaw.length, 1]);
    // Normalization (min-max)
    const xMin = xs.min();
    const xMax = xs.max();
    const yMin = ys.min();
    const yMax = ys.max();
    const xsNorm = xs.sub(xMin).div(xMax.sub(xMin));
    const ysNorm = ys.sub(yMin).div(yMax.sub(yMin));
    const normData = { xs, ys, xsNorm, ysNorm, xMin, xMax, yMin, yMax };
    return normData;
  }

  async function createAndTrain(parsed) {
    if (!parsed) return;
    const { xs, ys } = parsed;
    const { xsNorm, ysNorm, xMin, xMax, yMin, yMax } = prepareTensors(xs, ys);

    // Simple sequential model: 1 dense unit -> linear regression
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1 }));
    model.compile({ optimizer: tf.train.sgd(0.2), loss: 'meanSquaredError' });

    modelRef.current = { model, xMin, xMax, yMin, yMax };

    const epochs = 120;
    const batchSize = Math.max(1, Math.floor(xs.length / 2));

    const history = [];

    await model.fit(xsNorm, ysNorm, {
      epochs,
      batchSize,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          // record loss every 5 epochs to avoid spamming UI
          if (epoch % 5 === 0) {
            history.push({ epoch, loss: logs.loss });
            setLossHistory(history.slice());
          }
          await tf.nextFrame();
        }
      }
    });

    setTrained(true);

    // Cleanup tensors
    xsNorm.dispose();
    ysNorm.dispose();
  }

  function handleLoadData() {
    const parsed = parseCSV(csvText);
    if (!parsed) {
      alert('Failed to parse CSV - make sure it has at least 2 rows and comma-separated values.');
      return;
    }
    setData(parsed);
    setTrained(false);
    setLossHistory([]);
    modelRef.current = null;
  }

  async function handleTrain() {
    if (!data) {
      alert('Load data first (click "Load Data")');
      return;
    }
    setLossHistory([]);
    await createAndTrain(data);
    // after training, update chart predictions
    handlePredictAll();
  }

  function denormalize(tensorNorm, min, max) {
    return tensorNorm.mul(max.sub(min)).add(min);
  }

  async function handlePredictSingle(inputValue) {
    if (!modelRef.current) {
      alert('Model not trained yet');
      return;
    }
    const { model, xMin, xMax, yMin, yMax } = modelRef.current;
    const xVal = parseFloat(inputValue);
    const xTensor = tf.tensor2d([xVal], [1,1]);
    const xNorm = xTensor.sub(xMin).div(xMax.sub(xMin));
    const yPredNorm = model.predict(xNorm);
    const yPred = denormalize(yPredNorm, yMin, yMax);
    const predVal = (await yPred.data())[0];
    xTensor.dispose(); xNorm.dispose(); yPredNorm.dispose(); yPred.dispose();
    setPredictionResult(predVal);
    return predVal;
  }

  async function handlePredictAll() {
    if (!modelRef.current || !data) return;
    const { xs, ys } = data;
    const xTensor = tf.tensor2d(xs, [xs.length, 1]);
    const { model, xMin, xMax, yMin, yMax } = modelRef.current;
    const xNorm = xTensor.sub(xMin).div(xMax.sub(xMin));
    const yPredNorm = model.predict(xNorm);
    const yPred = denormalize(yPredNorm, yMin, yMax);
    const predArr = await yPred.data();
    // attach preds for chart display
    setData(prev => ({ ...prev, preds: Array.from(predArr) }));
    xTensor.dispose(); xNorm.dispose(); yPredNorm.dispose(); yPred.dispose();
  }

  async function handleSaveModel() {
    if (!modelRef.current) {
      alert('Model not trained');
      return;
    }
    // Save to localstorage (IndexedDB) via tfjs save
    await modelRef.current.model.save('localstorage://inventory-linear-model');
    // Also save normalization tensors as JSON
    const { xMin, xMax, yMin, yMax } = modelRef.current;
    const norm = {
      xMin: (await xMin.data())[0],
      xMax: (await xMax.data())[0],
      yMin: (await yMin.data())[0],
      yMax: (await yMax.data())[0],
    };
    localStorage.setItem('inventory-norm', JSON.stringify(norm));
    alert('Model saved to localstorage://inventory-linear-model');
  }

  async function handleLoadModel() {
    try {
      const model = await tf.loadLayersModel('localstorage://inventory-linear-model');
      const normRaw = JSON.parse(localStorage.getItem('inventory-norm'));
      if (!normRaw) throw new Error('Normalization data missing');
      const xMin = tf.scalar(normRaw.xMin);
      const xMax = tf.scalar(normRaw.xMax);
      const yMin = tf.scalar(normRaw.yMin);
      const yMax = tf.scalar(normRaw.yMax);
      modelRef.current = { model, xMin, xMax, yMin, yMax };
      setTrained(true);
      alert('Model loaded from localstorage');
      await handlePredictAll();
    } catch (err) {
      console.error(err);
      alert('Failed to load model: ' + err.message);
    }
  }

  // Build chart data for actual vs predicted
  const chartData = React.useMemo(() => {
    if (!data) return null;
    const labels = data.xs.map(x=>String(x));
    const actual = data.ys;
    const preds = data.preds || [];
    return {
      labels,
      datasets: [
        { label: 'Actual demand', data: actual, fill: false, tension: 0.2, pointRadius: 4 },
        { label: 'Predicted demand', data: preds.length ? preds : actual.map(()=>null), fill: false, borderDash: [6,4], tension: 0.2, pointRadius: 3 }
      ]
    };
  }, [data]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">Linear Regression — Inventory Demand Predictor</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">CSV Data (feature,label)</label>
        <textarea value={csvText} onChange={e=>setCsvText(e.target.value)} rows={6} className="w-full p-2 border rounded" />
        <div className="mt-2 flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleLoadData}>Load Data</button>
          <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={handleTrain}>Train Model</button>
          <button className="px-3 py-1 bg-gray-600 text-white rounded" onClick={handleLoadModel}>Load Saved Model</button>
          <button className="px-3 py-1 bg-yellow-600 text-white rounded" onClick={handleSaveModel}>Save Model</button>
        </div>
      </div>

      <div className="mb-4">
        <strong>Training status:</strong> {trained ? 'Model trained' : 'Not trained yet'}
        <div className="mt-2">
          <small>Loss history (sampled every 5 epochs):</small>
          <div className="flex gap-2 mt-1 flex-wrap">
            {lossHistory.map(h => (
              <div key={h.epoch} className="text-xs bg-gray-100 p-1 rounded">Epoch {h.epoch}: {h.loss.toFixed(4)}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Predict for new input (feature value):</label>
        <div className="flex gap-2">
          <input value={predictionInput} onChange={e=>setPredictionInput(e.target.value)} className="p-2 border rounded" />
          <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={()=>handlePredictSingle(predictionInput)}>Predict</button>
        </div>
        {predictionResult !== null && (
          <div className="mt-2">Predicted demand: <strong>{predictionResult.toFixed(2)}</strong></div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Actual vs Predicted</h3>
        {chartData ? (
          <div style={{height: '360px'}}>
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        ) : (
          <div className="text-sm text-gray-600">Load data to see chart.</div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-700">
        <p><strong>Notes:</strong> This example uses a simple single-variable linear regression with min-max normalization. For production inventory forecasting you may want to use more features (lead time, promotions, seasonality), regularization, cross-validation, and richer architectures (dense networks, LSTM for sequences) depending on data and requirements.</p>
      </div>
    </div>
  );
}
