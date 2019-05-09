describe('pooling layer: AveragePooling1D', function() {
  const assert = chai.assert
  const styles = testGlobals.styles
  const logTime = testGlobals.logTime
  const stringifyCondensed = testGlobals.stringifyCondensed
  const approxEquals = KerasJS.testUtils.approxEquals
  const layers = KerasJS.layers

  const testParams = [
    { inputShape: [6, 6], attrs: { pool_size: 2, strides: null, padding: 'valid' } },
    { inputShape: [6, 6], attrs: { pool_size: 2, strides: 1, padding: 'valid' } },
    { inputShape: [6, 6], attrs: { pool_size: 2, strides: 3, padding: 'valid' } },
    { inputShape: [6, 6], attrs: { pool_size: 2, strides: null, padding: 'same' } },
    { inputShape: [6, 6], attrs: { pool_size: 2, strides: 1, padding: 'same' } },
    { inputShape: [6, 6], attrs: { pool_size: 2, strides: 3, padding: 'same' } },
    { inputShape: [6, 6], attrs: { pool_size: 3, strides: null, padding: 'valid' } },
    { inputShape: [7, 7], attrs: { pool_size: 3, strides: 1, padding: 'same' } },
    { inputShape: [7, 7], attrs: { pool_size: 3, strides: 3, padding: 'same' } }
  ]

  before(function() {
    console.log('\n%cpooling layer: AveragePooling1D', styles.h1)
  })

  /*********************************************************
   * CPU
   *********************************************************/
  describe('CPU', function() {
    before(function() {
      console.log('\n%cCPU', styles.h2)
    })

    testParams.forEach(({ inputShape, attrs }, i) => {
      const key = `pooling.AveragePooling1D.${i}`
      const title = `[${key}] [CPU] test: ${inputShape} input, pool_size='${attrs.pool_size}', strides=${
        attrs.strides
      }, padding=${attrs.padding}`

      it(title, function() {
        console.log(`\n%c${title}`, styles.h3)
        let testLayer = new layers.AveragePooling1D(attrs)
        let t = new KerasJS.Tensor(TEST_DATA[key].input.data, TEST_DATA[key].input.shape)
        console.log('%cin', styles.h4, stringifyCondensed(t.tensor))
        const startTime = performance.now()
        t = testLayer.call(t)
        const endTime = performance.now()
        console.log('%cout', styles.h4, stringifyCondensed(t.tensor))
        logTime(startTime, endTime)
        const dataExpected = new Float32Array(TEST_DATA[key].expected.data)
        const shapeExpected = TEST_DATA[key].expected.shape
        assert.deepEqual(t.tensor.shape, shapeExpected)
        assert.isTrue(approxEquals(t.tensor, dataExpected))
      })
    })
  })

  /*********************************************************
   * GPU
   *********************************************************/
  describe('GPU', function() {
    before(function() {
      console.log('\n%cGPU', styles.h2)
    })

    testParams.forEach(({ inputShape, attrs }, i) => {
      const key = `pooling.AveragePooling1D.${i}`
      const title = `[${key}] [GPU] test: ${inputShape} input, pool_size='${attrs.pool_size}', strides=${
        attrs.strides
      }, padding=${attrs.padding}`

      it(title, function() {
        console.log(`\n%c${title}`, styles.h3)
        let testLayer = new layers.AveragePooling1D(Object.assign(attrs, { gpu: true }))
        let t = new KerasJS.Tensor(TEST_DATA[key].input.data, TEST_DATA[key].input.shape)
        console.log('%cin', styles.h4, stringifyCondensed(t.tensor))
        const startTime = performance.now()
        t = testLayer.call(t)
        const endTime = performance.now()
        console.log('%cout', styles.h4, stringifyCondensed(t.tensor))
        logTime(startTime, endTime)
        const dataExpected = new Float32Array(TEST_DATA[key].expected.data)
        const shapeExpected = TEST_DATA[key].expected.shape
        assert.deepEqual(t.tensor.shape, shapeExpected)
        assert.isTrue(approxEquals(t.tensor, dataExpected))
      })
    })
  })
})
