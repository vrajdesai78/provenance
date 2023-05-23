// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../utils/contractAddress";
import provenanceABI from "../../contracts/provenance.json";

interface product {
  name: string;
  description: string;
  imageURL: string;
  locationStatuses: string[];
  timestamp: string[];
  locationURL: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://matic-mumbai.chainstacklabs.com"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const contractFactory = new ethers.Contract(
    CONTRACT_ADDRESS,
    provenanceABI,
    wallet
  );

  console.log("fetching productDetails");
  const productDetails = await contractFactory.getProduct(id);

  const formattedTimestamps = [];

  for (let i = 0; i < productDetails.timestamp.length; i++) {
    const convertedTime = productDetails.timestamp[i];
    const date = new Date(convertedTime * 1000).toLocaleString();// Change the format of the date object to a localized string
    formattedTimestamps.push(date);
  }

  const product: product = {
    name: productDetails.name,
    description: productDetails.description,
    imageURL: productDetails.imageURL,
    locationStatuses: productDetails.locationStatuses,
    timestamp: formattedTimestamps,
    locationURL: productDetails.locationURL,
  };
  console.log(product);

  res.send(product);
}
