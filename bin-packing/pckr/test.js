// const chai from 'chai')
// const sinon from 'sinon')
// const sinonChai from 'sinon-chai')

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon

