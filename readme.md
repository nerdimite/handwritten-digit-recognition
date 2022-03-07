# Handwritten Digit Recognition

## Deep Learning (18CSE484T) Group Project

### _SRM Institute of Science and Technology, Delhi-NCR Campus_

### Group Members:

- Bhavesh Laddagiri (RA1911026030032)
- Akshaj Vishwanathan (RA1911026030003)
- Hardik Gupta (RA1911026030027)

This repository contains the source code for an end-to-end project for handwritten digit classication from training the model to deploying the model as an API using [CellStrat Hub](https://cellstrathub.com) and building a Web Application to invoke the API.

[Play with the Web Application Here](https://digit-recog.netlify.app)

## Usage

### Training

- The model is trained on the MNIST dataset
- To Train the model, run the [Handwritten-Digit-Recognition.ipynb](Handwritten-Digit-Recognition.ipynb) notebook

### Deployment as a REST API

1. Clone the repo in [CellStrat Hub](https://cellstrathub.com) Workspace.
2. Open a terminal and change directory to `digit-api`.
3. Directly run the build and deploy command by running the following command:

```bash
hub build --deploy
```

4. The process can take around 3 minutes and once deployed you will get your API endpoint.
5. To invoke your API you need to create/get your API Key from the [Deployment Dashboard](https://console.cellstrathub.com/deployments)
6. Now you can invoke your API endpoint and you can make `GET` request to load the model in memory and `POST` request to make predictions by sending a base64 encoded image of the digit.

[Learn More about Deployment here](https://docs.cellstrathub.com/HubAPI%20Deployment%20%F0%9F%9A%80/quickstart)

### Web Application

The web application is built using [Next.js](https://nextjs.org/), styled using [TailwindCSS](https://tailwindcss.com/) and statically hosted on [Netlify](https://netlify.com/). You can find the source code in [digit-app](./digit-app/).

If you wish to deploy your own version of the application with your own API endpoint and Key you need to specify the environment variables as follows:

- During development, add the endpoint url and key to the `.env.local` file like this

```
NEXT_PUBLIC_ENDPOINT=https://api.cellstrathub.com/<your username>/digit
NEXT_PUBLIC_API_KEY=<your key here>
```

- During deployment in Netlify, add these environment variables in your netlify configuration
