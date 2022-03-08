import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Container, Paper, Label, Button, Barchart } from "../components/core";
import CanvasDraw from "react-canvas-draw";

export default function Home() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
  const key = process.env.NEXT_PUBLIC_API_KEY;

  const canvasRef = useRef(null);
  const [image, setImage] = useState("");
  const [output, setOutput] = useState(null);

  const loadModel = async () => {
    setStatus(
      "🚧 Loading Model into Memory, Please Wait for around 30 seconds..."
    );
    setLoading(true);

    try {
      const raw_response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": key,
        },
        method: "GET",
      });
      const response = await raw_response.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  useEffect(async () => {
    await loadModel();
  }, []);

  const predict = async () => {
    setStatus("⏳ The model is performing inference");
    setLoading(true);

    try {
      const raw_response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": key,
        },
        method: "POST",
        body: JSON.stringify(image),
      });
      const response = await raw_response.json();
      console.log(response);
      setOutput(response["body"]["output"]);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Please try again.");
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  const handleExport = () => {
    let base64 = canvasRef.current.getDataURL().split(",")[1];
    // console.log(base64);
    setImage(base64);
  };

  return (
    <div>
      <Head>
        <title>Handwritten Digit Recognition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl mt-4">
            🤖{" "}
            <span className="font-bold text-blue-600">
              Handwritten Digit Recognition
            </span>{" "}
            ✒️
          </h1>
        </div>

        <Paper>
          {/* Input Canvas */}
          <center className="mb-4">
            <Label>✒️ Draw a Digit between 0 and 9 🔢</Label>
          </center>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-start gap-2">
              <CanvasDraw
                className="border-gray-300 border-2 rounded-md"
                onChange={handleExport}
                ref={canvasRef}
                canvasWidth={280}
                canvasHeight={280}
                brushColor="#fff"
                brushRadius={10}
                gridSizeX={10}
                gridSizeY={10}
                backgroundColor="#111827"
              />

              <button
                className="p-2 rounded-md bg-red-200 text-red-500 hover:bg-red-500 hover:text-red-200 transition ease-in-out duration-200"
                onClick={() => {
                  canvasRef.current.clear();
                  setImage(null);
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Status and Predict Button */}
          <div className="mt-4 mb-2 flex justify-between items-start flex-wrap">
            <p>
              <span className="font-semibold text-gray-700">Status:</span>{" "}
              {status}
            </p>
            <div className="flex items-center justify-center mt-2 gap-2">
              <Button
                disabled={!image}
                loading={loading}
                onClick={async () => {
                  await predict();
                }}
              >
                Predict Digit ✅
              </Button>
            </div>
          </div>

          {/* Outputs */}
          <Label>Top-3 Predictions📊</Label>
          {output && <Barchart data={output.slice(0, 3)} />}
        </Paper>
      </Container>
    </div>
  );
}
