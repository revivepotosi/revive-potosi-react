import { Box } from "@mui/material";
import colors from "../../style/colors";
import AppBar from "../appBar/AppBar";

interface Props {
    children: JSX.Element;
};

const GeneralContainer = ({ children }: Props) => (
    <Box sx= {{ minHeight: '100vh', backgroundColor: colors.background}}>
        <AppBar />
        { children }
    </Box>
);

export default GeneralContainer;
