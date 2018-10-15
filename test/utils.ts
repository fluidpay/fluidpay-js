import { urlBuilder } from '../src/utils'

test('builds "my" + "path" to equal "/my/path"', () => {
    expect(urlBuilder(['my', 'path'])).toBe('/my/path')
})
