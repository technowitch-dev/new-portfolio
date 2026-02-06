import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

import 'react-day-picker/dist/style.css';

interface DateTimePickerProps {
    value?: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function DateTimePicker({
    value,
    onChange,
    placeholder = 'Select date and time',
    className,
    disabled,
}: DateTimePickerProps) {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        value ? new Date(value) : undefined
    );
    const [timeValue, setTimeValue] = React.useState<string>(() => {
        if (value) {
            const date = new Date(value);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        }
        return '';
    });
    const [isOpen, setIsOpen] = React.useState(false);
    const formatLocalToUTC = (date: Date): string => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    React.useEffect(() => {
        if (value) {
            const date = new Date(value);
            setSelectedDate(date);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            setTimeValue(`${hours}:${minutes}`);
        } else {
            setSelectedDate(undefined);
            setTimeValue('');
        }
    }, [value]);

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            // If time is already set, combine date and time
            if (timeValue) {
                const [hours, minutes] = timeValue.split(':');
                const newDate = new Date(date);
                newDate.setHours(parseInt(hours) || 0);
                newDate.setMinutes(parseInt(minutes) || 0);
                // Convert local time to UTC before sending
                onChange(formatLocalToUTC(newDate));
            } else {
                // Just set the date, time will be set separately
                const newDate = new Date(date);
                newDate.setHours(0);
                newDate.setMinutes(0);
                // Convert local time to UTC before sending
                onChange(formatLocalToUTC(newDate));
            }
        } else {
            setSelectedDate(undefined);
            onChange('');
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTimeValue(newTime);
        
        if (selectedDate && newTime) {
            const [hours, minutes] = newTime.split(':');
            const newDate = new Date(selectedDate);
            newDate.setHours(parseInt(hours) || 0);
            newDate.setMinutes(parseInt(minutes) || 0);
            onChange(formatLocalToUTC(newDate));
        } else if (selectedDate) {
            // Date selected but no time yet
            const newDate = new Date(selectedDate);
            newDate.setHours(0);
            newDate.setMinutes(0);
            onChange(formatLocalToUTC(newDate));
        }
    };

    const displayValue = selectedDate
        ? `${format(selectedDate, 'PPP')} ${timeValue ? `at ${timeValue}` : ''}`
        : '';

    return (
        <div className={cn('flex gap-2', className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            'w-full justify-start text-left font-serif',
                            !selectedDate && 'text-portfolio-color2',
                            'bg-portfolio-bg border-portfolio-color2 text-portfolio-text hover:bg-portfolio-color2 hover:text-portfolio-text'
                        )}
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                            displayValue
                        ) : (
                            <span className="text-portfolio-color2">{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-portfolio-bg border-portfolio-color2" align="start">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        className="p-3"
                        classNames={{
                            months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                            month: 'space-y-4',
                            caption: 'flex justify-center pt-1 relative items-center',
                            caption_label: 'text-sm font-gothica font-bold text-portfolio-text',
                            nav: 'space-x-1 flex items-center',
                            nav_button: cn(
                                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                                'text-portfolio-text hover:bg-portfolio-color2',
                                'border border-portfolio-color2 rounded-md'
                            ),
                            nav_button_previous: 'absolute left-1',
                            nav_button_next: 'absolute right-1',
                            table: 'w-full border-collapse space-y-1',
                            head_row: 'flex',
                            head_cell: 'text-portfolio-color2 rounded-md w-9 font-gothica font-bold text-xs',
                            row: 'flex w-full mt-2',
                            cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-portfolio-bg/50 [&:has([aria-selected])]:bg-portfolio-color2 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                            day: cn(
                                'h-9 w-9 p-0 font-serif text-portfolio-text aria-selected:opacity-100',
                                'hover:bg-portfolio-color2 hover:text-portfolio-text rounded-md'
                            ),
                            day_selected: 'bg-portfolio-color2 text-portfolio-text font-gothica font-bold hover:bg-portfolio-color2 hover:text-portfolio-text focus:bg-portfolio-color2 focus:text-portfolio-text',
                            day_today: 'bg-portfolio-bg text-portfolio-text font-gothica font-bold',
                            day_outside: 'day-outside text-portfolio-color2 opacity-50 aria-selected:bg-portfolio-bg/50 aria-selected:text-portfolio-color2 aria-selected:opacity-30',
                            day_disabled: 'text-portfolio-color2 opacity-50',
                            day_range_middle: 'aria-selected:bg-portfolio-color2 aria-selected:text-portfolio-text',
                            day_hidden: 'invisible',
                        }}
                    />
                </PopoverContent>
            </Popover>
            <div className="relative flex-1">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-portfolio-color2 pointer-events-none" />
                <Input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    disabled={disabled || !selectedDate}
                    className="pl-10 bg-portfolio-color1 border-portfolio-color2 text-portfolio-text placeholder:text-portfolio-text"
                    placeholder="Time"
                />
            </div>
        </div>
    );
}
