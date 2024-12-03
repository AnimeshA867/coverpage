"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Template from "./Template"; // Assuming the previous Template component is in the same directory
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  program as ProgramList,
  semester as SemesterList,
  fullName,
} from "@/utils/semester";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  teacher: z
    .string()
    .min(2, { message: "Teacher's name must be at least 2 characters" }),
  program: z
    .string()
    .min(2, { message: "Program must be at least 2 characters" }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters" }),
  semester: z
    .string()
    .min(2, { message: "Semester must be at least 2 characters" }),
});
import { data } from "@/utils/data";
export default function TemplateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      teacher: "",
      program: "BCA",
      subject: "",
      semester: "Semester I",
    },
  });

  const [showPreview, setShowPreview] = useState(false);
  const program = form.watch("program");
  const semester = form.watch("semester");

  // Ensure data and semesterData exist before accessing the nested keys
  const semesterData = data[program as keyof typeof data];

  if (!semesterData) return; // If semesterData is undefined, exit early

  // Ensure filteredData is correctly retrieved with the correct type
  const filteredData = semesterData[semester as keyof typeof semesterData];

  const subjectList = filteredData.map((item) => item.subject);
  const code = filteredData
    .filter((item) => item.subject === form.watch("subject"))
    .map((item) => item.code);

  if (!filteredData) return; // If filteredData is undefined, exit early

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log("this is working.");
    setShowPreview(true);
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2">
              Document Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter document title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2">
              Subject
            </label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject name"
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="code" className="block mb-2">
              Subject Code
            </label>
            <Input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter subject code"
              className={errors.code ? "border-red-500" : ""}
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          <div>
            <label htmlFor="teacher" className="block mb-2">
              Teacher's Name
            </label>
            <Input
              type="text"
              id="teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              placeholder="Enter teacher's name"
              className={errors.teacher ? "border-red-500" : ""}
            />
            {errors.teacher && (
              <p className="text-red-500 text-sm mt-1">{errors.teacher}</p>
            )}
          </div>

          <div>
            <label htmlFor="program" className="block mb-2">
              Program
            </label>
            <Input
              type="text"
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="Enter program name"
              className={errors.program ? "border-red-500" : ""}
            />
            {errors.program && (
              <p className="text-red-500 text-sm mt-1">{errors.program}</p>
            )}
          </div>

          <div>
            <label htmlFor="semester" className="block mb-2">
              Semester
            </label>
            <Input
              type="text"
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="Enter semester"
              className={errors.semester ? "border-red-500" : ""}
            />
            {errors.semester && (
              <p className="text-red-500 text-sm mt-1">{errors.semester}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Generate Template
          </Button>
        </form>
      </div> */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Lab Report Cover</CardTitle>
          <CardDescription>
            Create your lab report cover in one click
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your name in the template.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teacher&apos;s Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your teacher's name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your teacher&apos;s name in the template. Add
                          (Sir/Madam) yourself
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="program">Program</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger id="program">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {ProgramList.map((p) => (
                                <SelectItem key={p} value={p}>
                                  {p}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          This is your faculty to be shown in the template.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="program">Program</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger id="program">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {SemesterList.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          This is your semester in the template.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {semester && (
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="program">Subject</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger id="program">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {subjectList.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            This is your Subject name in the template.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="my-8 w-full flex justify-center">
                <Button type="submit">Generate Template</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {showPreview && (
        <AlertDialog open={showPreview} onOpenChange={setShowPreview}>
          <AlertDialogContent className="max-w-[90%] max-h-[90%] overflow-auto">
            <AlertDialogHeader className="mx-auto ">
              <AlertDialogTitle className="text-center">
                Template Preview
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Review your document template
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="w-full overflow-x-auto flex justify-center">
              <Template
                name={form.getValues("name")}
                subject={form.getValues("subject")}
                code={code[0]}
                teacher={form.getValues("teacher")}
                program={
                  fullName[
                    form.getValues("program") as keyof typeof fullName
                  ] as string
                }
                semester={form.getValues("semester")}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
