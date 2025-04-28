'use client'

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerWithRangeProps {
  className?: string
  onChange?: (date: DateRange | undefined) => void
  initialDateFrom?: Date
  initialDateTo?: Date
}

export function DatePickerWithRange({
  className,
  onChange,
  initialDateFrom,
  initialDateTo,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateFrom && initialDateTo 
      ? { from: initialDateFrom, to: initialDateTo }
      : undefined
  )

  React.useEffect(() => {
    if (onChange) {
      onChange(date)
    }
  }, [date, onChange])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-slate-800/75 text-slate-300 border-white/10 hover:border-white/20 hover:bg-slate-700/75",
              !date && "text-slate-400"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-sky-300" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Filtern nach Datum</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-700 text-slate-300" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="bg-slate-900 text-slate-300"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}