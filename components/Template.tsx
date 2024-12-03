"use client";
import { FC, useRef } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface TemplateProps {
  name: string;
  subject: string;
  code: string;
  teacher: string;
  program: string;
  semester: string;
}

const Template: FC<TemplateProps> = ({
  name,
  subject,
  code,
  teacher,
  program,
  semester,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Lab Report of ${subject}.pdf`);
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="flex flex-col items-center w-[210mm] h-[297mm]  p-12 bg-white space-y-4"
      >
        <div className="w-full  h-[200px] text-center space-y-2 justify-center flex flex-col">
          <h1 className="text-2xl font-bold">Lab Report</h1>
          <h1 className="text-2xl font-bold">Of</h1>
          <h1 className="text-2xl font-bold">{subject}</h1>
          <h1 className="text-2xl font-bold">Subject Code: {code}</h1>
        </div>

        <div className="w-full  h-[200px] flex flex-row justify-between items-center">
          <div className="h-auto w-[150px]">
            <img
              src={"/tribhuvan-logo.png"}
              alt="..."
              height={500}
              width={500}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-row items-center space-x-8 flex-0">
            <div className="border-[3px] h-[125px] border-black"></div>
            <div className="border-[3px] h-[200px] border-black"></div>
            <div className="border-[3px] h-[125px] border-black"></div>
          </div>
          <div className="h-auto w-[150px]">
            <img
              src={"/vedas-logo.png"}
              alt="..."
              height={500}
              width={500}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="w-full  h-[250px] text-center text-2xl space-y-2 justify-center flex flex-col">
          <h1 className="font-bold">Submitted To:</h1>
          <h2 className="font-semibold">{teacher}</h2>
          <h1 className="font-light">Vedas College</h1>
          <h1 className="font-light">(Affiliated To Tribhuvan University)</h1>
          <h1 className="font-semibold">Jwalakhel, Lalitpur</h1>
        </div>
        <div className="w-full  h-[200px] text-center justify-center flex flex-col text-2xl">
          <h1 className="font-bold">Submitted By:</h1>
          <h2 className="font-light">{name}</h2>
        </div>

        <div className="w-full  text-xl font-semibold mt-8">
          <p>Program: {program}</p>
          <p>Semester: {semester}</p>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mx-auto"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Template;