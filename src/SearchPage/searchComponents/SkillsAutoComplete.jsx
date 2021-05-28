import { searchStyles } from "../../common/PageStyles";
import { SearchSettingsContext } from "./SearchSettingsContext";
import { skillOptions } from '../../dataStores/skills';
import { Button, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useContext } from "react";

/**
 * Functional component built using Material UI components. This component is a search bar, 
 * which is used to query firestore to find users with the searched skill.
 */
export default function SkillAutoComplete(props) {
    const { setSearchedSkills, getUsersFromSkillSearch } = props;

    const classes = searchStyles();
    const searchSettings = useContext(SearchSettingsContext);
    const havePrevSettings = !!searchSettings.skills;
    const initialState = havePrevSettings ? searchSettings.skills : [];

    /**
   * Updates the array in state to hold the newly searched skill.  Array is used
   * so the function will work with multiple searched skills in the future.
   * @param {*} event a change in what is selected in the Autocomplete
   * @param {*} currentSelectedSkills the skill currently selecte din the Autocomplete
   */
    function searchedSkillUpdate(event, currentSelectedSkills) {
        const skills = [currentSelectedSkills];
        setSearchedSkills(skills);
        searchSettings.skills = skills;
    }

    const InnerTextField = (params) => (
        <TextField
            {...params}
            variant="outlined"
            fullWidth
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <Button id="searchBtn"
                            onClick={(e) => getUsersFromSkillSearch()}
                        >
                            <SearchIcon color='primary' className={classes.searchIcon} />
                        </Button>
                    </InputAdornment>
                )
            }}
        />);

    return (
        <Autocomplete
            id="combo-box-demo"
            className={classes.inputRoot}
            options={skillOptions}
            onChange={searchedSkillUpdate}
            disableClearable
            placeholder="Search By Skills"
            defaultValue={initialState.length === 0 ? "" : initialState[0]}
            forcePopupIcon={false}
            getOptionLabel={option => option}
            renderInput={params => <InnerTextField {...params} />}
        />
    )
}
