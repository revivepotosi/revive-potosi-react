import { Container, Typography } from "@mui/material";
import GeneralContainer from "../../../components/generalContainer/GeneralContainer";
import colors from "../../../style/colors";
import ChipGroup from "../../../components/chipGroup/ChipGroup";

const Museum = () => {
    return (
        <GeneralContainer>
            <Container maxWidth="xl" sx={{ paddingTop: '1rem'}}>
                <Typography variant='h5' gutterBottom sx={{ color: colors.primary, fontWeight: 'bold'}}>Museos</Typography>
                <ChipGroup />
            </Container>
        </GeneralContainer>
    );
};

export default Museum;
