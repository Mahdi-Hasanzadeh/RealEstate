import { Box, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { BLACK } from "../styles/Color";

const TimePassed = ({ date }) => {
  return (
    <Box mt={1} mb={1}>
      <Typography variant="body2" color={BLACK}>
        ({date && formatDistanceToNow(new Date(date))} ago)
      </Typography>
    </Box>
  );
};
export default TimePassed;
