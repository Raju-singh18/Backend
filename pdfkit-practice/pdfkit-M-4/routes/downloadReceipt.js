
const generateReceiptPdf = require("../utils/generateReceiptPdf");

const express = require("express");

const router = express.Router();

router.get("/download-receipt",async(req,  res)=>{
 try {
        const pdfBuffer = await generateReceiptPdf();

    res.set({
        "Content-Type":"application/pdf",

        "Content-Disposition":`attachment; filename=eventme-receipt.pdf`,

        "Content-Length":pdfBuffer.length,
    });

    res.send(pdfBuffer);
 } catch (error) {
    console.log("PDF Erro:", error);

    res.status(500).json({
        message:"PDF generation Failed",
        error:error.message
    })
 }
});

module.exports = router;
