// Queue of promises to be finished
// let _queue = []

// pipeRunner(Promise.resolve('resolved!'))
// .pipe(Promise.resolve(lastResolved), lastResolved)

// pipeRunner = new PipeRunner(context)
// pipeRunner
// .pipe([
//    clean(),
//    createTestConf(),
//    createUnitTests(),
//    addUnitTestDependencies(),
//    final()
//  ])
// 
// or
// 
// pipeRunner 
// .pipe(clean())
// .pipe(createTestConf())
// .pipe(createUnitTests())
// .pipe(addUnitTestDependencies())
// .pipe(final())

class PipeRunner {
  constructor (context) {
    this.pipeResult = Promise.resolve(null)
    this.context = context || global
  }

  pipe (promiseCreatorArr = []) {
    // For single promise pipe
    if (promiseCreatorArr && typeof promiseCreatorArr === 'function') {
      promiseCreatorArr = [promiseCreatorArr]
    }

    this.pipeResult = promiseCreatorArr.reduce(
      (prevPromise, nextPromiseCreator) => {
        return prevPromise.then((prevResloved) => nextPromiseCreator(prevResloved))
      }, 
      this.pipeResult)

    return this
  }
} 


module.exports = PipeRunner