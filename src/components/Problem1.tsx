import { useEffect, useState } from "react";

export default function App() {
  const [number, setNumber] = useState(35);
  const [result, setResult] = useState<{
    value: number;
    duration: number;
  } | null>(null);
  const [computing, setComputing] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    // Initialize the worker
    const workerInstance = new Worker(new URL("./utils/worker.ts", import.meta.url));
    setWorker(workerInstance);

    // Set up the message handler
    workerInstance.onmessage = (event) => {
      const { value, duration } = event.data;
      setResult({ value, duration });
      setComputing(false);
    };

    // Cleanup worker on unmount
    return () => {
      workerInstance.terminate();
    };
  }, []); // Properly close the dependency array and effect function

  const handleCompute = () => {
    if (!worker) return;

    setComputing(true);
    // Send the number to the worker
    worker.postMessage(number);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Problem 1: Fibonacci Calculator</h1>
      <p>Implement a Web Worker to prevent UI blocking</p>
      <div style={{ marginTop: "20px" }}>
        <h3>Instructions:</h3>
        <ol className="instructions">
          <li>Try calculating Fibonacci numbers above 35</li>
          <li>Notice how the UI becomes unresponsive during calculation</li>
          <li>Try moving the slider while computing</li>
        </ol>
      </div>
      <div>
        <label htmlFor="fibonacci-number">Enter a number:</label>
        <input
          id="fibonacci-number"
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
          style={{ margin: "10px 0" }}
          aria-label="fibonacci-number"
        />
        <button
          onClick={handleCompute}
          disabled={computing}
          style={{ marginLeft: "10px" }}
        >
          {computing ? "Computing..." : "Calculate"}
        </button>
      </div>

      {/* Try moving the slider while computing! */}
      <div style={{ margin: "20px 0" }}>
        <input type="range" min="0" max="100" style={{ width: "200px" }} />
      </div>

      {result && (
        <div>
          <p>Result: {result.value}</p>
          <p>Time taken: {result.duration.toFixed(2)}ms</p>
        </div>
      )}
    </div>
  );
}
