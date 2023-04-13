import { Box } from "@mui/material";
import { ErrorProps } from "../types/error";
import { Link } from "react-router-dom";

const NotFound = ({ code, headline, message, url, urlText }: ErrorProps) => {
  return (
    <section className="page_404">
      <Box textAlign={"center"}>
        <div className="four_zero_four_bg">
          <h1>{code || 404}</h1>
        </div>
        <div className="contant_box_404">
          <h3 className="h2">{headline || "Look like you're lost"}</h3>
          <p>{message || "the page you are looking for not avaible!"}</p>
          <Link to={url || "/"} className="link_404">
            {urlText || "Go to Home"}
          </Link>
        </div>
      </Box>
    </section>
  );
};
export default NotFound;
