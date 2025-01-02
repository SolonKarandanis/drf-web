"use client";

import { DragEvent, useState, forwardRef } from "react";
import { InputProps } from "../props";
import { twMerge } from "tailwind-merge";
import CFormError from "../form-error/form-error";

const FileDrop =forwardRef<HTMLInputElement, InputProps>(
  ({ 
    name,
    sectionClassName,
    className,
    required,
    children,
    props,
    error,
    ...rest
  }, ref) =>{

    const [isOver, setIsOver] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    // Define the event handlers
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsOver(true);
    };
    
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsOver(false);
    };
    
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsOver(false);
        
        // Fetch the files
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles(droppedFiles);

        // Use FileReader to read file content
        droppedFiles.forEach((file) => {
            const reader = new FileReader();
    
            reader.onloadend = () => {
              console.log(reader.result);
            };
    
            reader.onerror = () => {
              console.error("There was an issue reading the file.");
            };
    
            reader.readAsDataURL(file);
            return reader;
        });
    };

    const requiredCss = required? 'required' : '';
    const labelHtml = (
        <label htmlFor={name} className={`form-label text-default ${requiredCss}`}>
            {children}
        </label>
    )

    const errorHtml = error ? (<CFormError error={error} />) : null;

    return (
      <section className={sectionClassName}>
        {labelHtml}
        <input
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={twMerge('form-control',className)}
          ref={ref}
          {...rest}
        >
        </input>
        {errorHtml}
      </section>
    
  );
  }
)

FileDrop.displayName = "test"
export default FileDrop