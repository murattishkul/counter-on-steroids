import {TrophiesContainer, TrophiesShorthand, Trophy} from './atoms';
import {Text} from '../Text'
const Trophies = ({trophies}) => {
    return (
        <>
        {trophies > 0 && 
            <TrophiesContainer>
              { trophies > 5 ? 
                  <TrophiesShorthand>
                    <Text style={{position: 'relative'}}>{`${trophies} X `}</Text>
                    <Trophy/>
                  </TrophiesShorthand> 
                  : [...Array(trophies).keys()].map((t, index) => <><Trophy key={`index-${index}`} /></>)}
            </TrophiesContainer>}
        </>
    )
}

export default Trophies;