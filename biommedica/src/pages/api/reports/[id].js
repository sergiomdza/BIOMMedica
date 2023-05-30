import { dbConnect } from '../../../utils/mongoose';
import Reports from '@/models/report';

dbConnect()

export default async (req, res) => {

	const { query: { id }, method, body } = req;

	switch (method) {
		case "GET":
			try {
				const reports = await Reports.findById(id)
				if (!reports) return res.status(404).json({ msg: "Report not found" });
				return res.status(200).json(reports);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		case "PUT":
			try {
				try {
					delete body._id;
					delete body.createdAt;
					delete body.updatedAt;
				} catch (error) {
					console.log('Error Cleaning fields:', error)
				}

				const {  name, zone, machine, startDate, endDate, consumed  } = JSON.parse(body);
				const reports = await Reports.findOneAndUpdate({ _id: id }, { $set: { name, zone, machine, startDate, endDate, consumed } }, { new: true })
				if (!reports) return res.status(404).json({ msg: "Report not found" });
				return res.status(200).json(reports);
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		case "DELETE":
			try {
				const deletedReport = await Reports.findByIdAndDelete(id);

				if (!deletedReport) return res.status(404).json({ msg: "Report not found" });
				return res.status(200).json(deletedReport);

			} catch (error) {
				return res.status(500).json({ error: error.message });
			}

		default:
			return res.status(400).json({ msg: "This method is not supported" });
	}

}