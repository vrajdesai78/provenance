import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function postData(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "authorization":"TOKEN APT0YU5JtEOK0fQrpzEvr62YBhpqsb88hgKSSRNokGLQ",
          // 'apy-token': 'APT0YU5JtEOK0fQrpzEvr62YBhpqsb88hgKSSRNokGLQ',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: '{"content":"https://apyhub.com"}'
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  // await runMiddleware(req, res, cors)
try {
  const response = await fetch("https://api.apyhub.com/generate/qr-code/url?output=sample.png", {
    mode: "cors",
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "authorization":"TOKEN APT0YU5JtEOK0fQrpzEvr62YBhpqsb88hgKSSRNokGLQ",
      'apy-token': 'APT0YU5JtEOK0fQrpzEvr62YBhpqsb88hgKSSRNokGLQ',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({"content": "test"})
  });
  const responseData = await response.json();
  console.log(responseData)
  res.send(responseData);
} catch(e: any){
    console.log("test", e)
}
}