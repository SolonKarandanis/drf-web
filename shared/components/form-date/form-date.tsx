"use client";

import {FC, PropsWithChildren, useState} from 'react'
 // @ts-ignore
import DatePicker from 'react-datepicker';
import { DateInputProps } from '../props';
import FormLabel from '../form-label/form-label';
import FormError from '../form-error/form-error';
import { CiCalendarDate } from "react-icons/ci";


const FormDate:FC<PropsWithChildren<DateInputProps>> = ({
    name,
    field,
    required=false,
    loading=false,
    error,
    sectionClassName,
    minDate =new Date(),
    children
}) => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const handleDateChange = (date:Date) => {
        // Ensure date is defined before setting it
        if (date) {
            setSelectedDate(date);
        }
    };

    const hasError = error? true:false;
    const labelHtml = children ? (
        <FormLabel 
            name={name}
            required={required}
            hasError={hasError}>
            {children}
        </FormLabel>
    ):null;

    if(loading){
        return (
          <section className={sectionClassName}>
            {labelHtml}
            <div role="status" className="w-full animate-pulse dark:border-gray-700">
              <div className="h-10 bg-gray-400  dark:bg-gray-700 mb-2.5"></div>
            </div>
          </section>
        )
    }


    const errorHtml = error ? (<FormError error={error} />) : null;

    const dateHtml = (
        <DatePicker
            showIcon
            icon={<CiCalendarDate />}
            toggleCalendarOnIconClick
            isClearable
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy/MM/dd HH:mm"
            minDate={minDate}
            selected={field.value} 
            onChange={(date:Date) => field.onChange(date)} />
    );

    return (
        <section className={sectionClassName}>
            {labelHtml}
            {dateHtml}
            {errorHtml}
        </section>
    )
}

export default FormDate