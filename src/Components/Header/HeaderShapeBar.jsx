import './HeaderShapeBar.css'

const shapeList = [
  'shape shape-1 circle red move-a',
  'shape shape-2 square pink move-b',
  'shape shape-3 triangle orange move-c',
  'shape shape-4 circle blue move-d',
  'shape shape-5 square green move-e',
  'shape shape-6 circle purple move-f',
  'shape shape-7 square yellow move-a',
  'shape shape-8 triangle blue move-b',
  'shape shape-9 circle green move-c',
  'shape shape-10 square indigo move-d',
  'shape shape-11 triangle red move-e',
  'shape shape-12 circle pink move-f',
  'shape shape-13 square orange move-a',
  'shape shape-14 circle blue move-b',
  'shape shape-15 triangle green move-c',
  'shape shape-16 square purple move-d',
  'shape shape-17 circle orange move-e',
  'shape shape-18 square blue move-f',
  'shape shape-19 square pink move-a',
  'shape shape-20 square green move-b',
  'shape shape-21 triangle purple move-c',
  'shape shape-22 triangle yellow move-d',
  'shape shape-23 triangle indigo move-e',
  'shape shape-24 square red strong-shape move-f',
  'shape shape-25 square blue strong-shape move-a',
  'shape shape-26 square orange strong-shape move-b',
  'shape shape-27 square green strong-shape move-c',
  'shape shape-28 triangle pink strong-shape move-d',
  'shape shape-29 triangle blue strong-shape move-e',
  'shape shape-30 triangle orange strong-shape move-f',
  'shape shape-31 triangle purple strong-shape move-a',
  'shape shape-32 square yellow strong-shape move-b',
  'shape shape-33 square purple strong-shape move-c',
  'shape shape-34 square green strong-shape move-d',
  'shape shape-35 triangle blue strong-shape move-e',
  'shape shape-36 triangle orange strong-shape move-f',
  'shape shape-37 triangle indigo strong-shape move-a',
]

function HeaderShapeBar() {
  return (
    <div className="shape-bar">
      {shapeList.map((shape) => (
        <span className={shape} key={shape}></span>
      ))}
    </div>
  )
}

export default HeaderShapeBar
