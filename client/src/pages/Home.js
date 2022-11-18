
import ExplorePics from '../components/ExplorePics'
import Header from '../components/Header'
import ParkSummaryCards from '../components/ParkSummaryCards'
import ParkVideo from '../components/ParkVideo'
import ThingsToDo from '../components/ThingsToDo'
import Form from '../components/form'

const Home = ({parksInfo, activitiesInfo}) => {
  console.log(activitiesInfo, "activitiesInfo Home")

  let fewActivities = activitiesInfo.slice(0, 8)

  return (
    <>
        <Header/>
        <ParkSummaryCards parksInfo={parksInfo} num={52} title={"Explore"} seeMore={<button>See More</button>}/>
        <Form />
        <ThingsToDo activitiesInfo={fewActivities} num= {4} seeMore={<button>See More</button>}/>
        <ParkVideo/>
        <ExplorePics parksInfo={parksInfo}/>
    </>
  )
}

export default Home