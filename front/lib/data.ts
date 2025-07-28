import fs from "fs"
import path from "path"



export async function getCallForPapersData() {
  const filePath = path.join(process.cwd(), "data", "call-for-papers.json")
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}

export async function getProgramData() {
  const filePath = path.join(process.cwd(), "data", "program.json")
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}
export async function getContactData() {
  const filePath = path.join(process.cwd(), "data", "contact.json")
  const fileContents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(fileContents)
}