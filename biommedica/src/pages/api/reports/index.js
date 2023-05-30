import { dbConnect } from '../../../utils/mongoose';
import Reports from '@/models/report';

dbConnect()

export default async function handler(req, res) {

  const { method, body } = req;

  switch (method) {
    case "GET":

      try {
        const machines = await Reports.find();
        return res.status(200).json(machines)
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case "POST":
      try {
        const newReport = new Reports(JSON.parse(body));
        const savedReport = await newReport.save()
        return res.status(201).json(savedReport)
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }

    case "PUT":
      console.log('Count')
      try {
        const totalReports = await Reports.countDocuments({});

        if (!totalReports) return res.status(404).json({ msg: "No data" });
        console.log('Total:', totalReports)
        return res.status(200).json({ count: totalReports });

      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};