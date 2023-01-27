// This is an example of how to access a session from an API route
import { unstable_getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]"

// import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req,
  res
) {
  const session = await unstable_getServerSession(req, res, options)
  res.send(JSON.stringify(session, null, 2))
}
