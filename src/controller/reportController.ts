import Report from '../model/Report';

import { Request, Response } from 'express';

const addReport = async (req: Request, res: Response) => {
    const owner = req.params.id;
    const reason = req.body.reason;
    const user_to_report = req.body.user_to_report;
    const newReport = new Report({
		owner,
        user_to_report,
        reason
        
	});
    await newReport.save( (err: any) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json({ status: 'Report saved' });
    });
}

const getReports = async (req: Request, res: Response) => {
    const reports = await Report.find();
    res.json(reports);
}

const getReport = async (req: Request, res: Response) => {
    const report = await Report.findById(req.params.id_report);
    if (!report) {
        return res.status(404).send('The report does not exist');
    }
    res.json(report);
}

const deleteReport = async (req: Request, res: Response) => {
    try {
        const user = await Report.findOneAndDelete({ id: req.params.id}).catch(Error);
        res.status(200).json({ status: 'Report deleted' });
    }
    catch (error) {
        res.status(500).json({message: 'Report not found', error });
    }
}

export default { 
    addReport, 
    getReports, 
    getReport,
    deleteReport
};