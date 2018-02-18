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

  static isPromise (promiseToCheck) {
    return Object.prototype.toString.call(promiseToCheck) === '[object Promise]'
  }

  pipe (promiseArr = []) {
    // For single promise pipe
    if (promiseArr && PipeRunner.isPromise(promiseArr)) {
      promiseArr = [promiseArr]
    }

    this.pipeResult = promiseArr.reduce((prevPromise, nextPromise) => {
      return prevPromise.then((prevResloved) => nextPromise)
    }, this.pipeResult)

    return this
  }
} 


module.exports = PipeRunner