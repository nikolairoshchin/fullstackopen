const Header = ({name}) => {
    return <h1>{name}</h1>
}
  
const Part =({part}) => {
    return <p>{part.name} {part.exercises}</p>
}
  
const Content = ({parts}) => {
    return ( 
      <>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </>
    )
    
}
  
const Total = ({parts}) => {
    const total = parts.reduce((accum, part) => accum + part.exercises, 0)
    return (
      <p>Number of exercises {total}</p>
    )
}
  
const Course = ( {courses} ) => {
    return (
    <div>
      {courses.map(course => 
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      )}
    </div>
    )
}

export default Course
  