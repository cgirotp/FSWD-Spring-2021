import React from 'react'

const Header = (props) => <h2>{props.course}</h2> 

const Total = (props) => {
  const parts = props.parts
  const total = parts.reduce((s, p) => {
    return {exercises: s.exercises + p.exercises}
  })
  return (
    <b>total of {total.exercises} exercises</b>
  )
}

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = (props) => {
  const parts = props.parts
  return (
  <>
  {parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
  </>
  )
}

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course