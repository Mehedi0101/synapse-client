import { format, parse } from "date-fns";

const hourFormatConverter = (timeString) => {
    if (!timeString) return "";
    const parsedTime = parse(timeString, "HH:mm", new Date());
    return format(parsedTime, "hh:mm a"); // e.g. "02:30 PM"
};

export default hourFormatConverter;