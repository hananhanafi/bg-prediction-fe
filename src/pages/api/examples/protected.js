// This is an example of to protect an API route
import { unstable_getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]"

// import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req,
  res
) {
  const session = await unstable_getServerSession(req, res, options)

  if (session) {
    return res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  }

  res.send({
    error: "You must be signed in to view the protected content on this page.",
  })
}
