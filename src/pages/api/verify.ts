// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import base64ArrayBuffer from "base64-arraybuffer";
import type { NextApiRequest, NextApiResponse } from "next";
import * as nacl from "tweetnacl";

const arrayBufferToBase64 = base64ArrayBuffer.encode;
const base64ToArrayBuffer = base64ArrayBuffer.decode;

const decode = (data: ArrayBuffer) => new TextDecoder("utf-8").decode(data);
const encode = (data: string): Uint8Array => new TextEncoder().encode(data);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);

  const isValid = nacl.sign.detached.verify(
    Uint8Array.from(Buffer.from(body.dataToVerify)),
    Uint8Array.from(Buffer.from(body.dataSignature, "hex")),
    Uint8Array.from(Buffer.from(body.publicKey, "hex"))
  );

  res.status(200).json({ isValid });
};
