import {ModeSelect, Option} from './atoms';

const Select = ({gameMode, selectGameMode}) => {
    return (
        <ModeSelect
          labelId="gamemode-select"
          id="gamemode-select"
          value={gameMode}
          label="Mode"
          onChange={selectGameMode}
        >
          <Option value={"easy"}>Easy</Option>
          <Option value={"medium"}>Medium</Option>
          <Option value={"hard"}>Hard</Option>
        </ModeSelect>
    )
}

export default Select;