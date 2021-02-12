const Upload = require("../lib").Upload;
const chai = require("chai"),
    expect = chai.expect;
const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-fetch');

const dotenv = require('dotenv').config({ path: '.env.test' });
if (dotenv.error) { throw dotenv.error }

describe("Thumbor Upload", () => {
    let upload = null;
    describe('Instance', () => {
        it('is an function', () => {
            expect(Upload).to.be.an('function');
        });
        it('empty', () => {
            const empty = new Upload();
            expect(empty).to.be.an.instanceof(Upload);
            expect(empty).to.have.property('url', undefined);
        });
        it('new', () => {
            upload = new Upload(process.env.THUMBOR_URL);
            expect(upload).to.be.an.instanceof(Upload);
            expect(upload).to.have.property('url', process.env.THUMBOR_URL);
        });
    });
    describe('Create', () => {
        upload = new Upload(process.env.THUMBOR_URL);
        const data = fs.readFileSync(path.resolve(__dirname, 'image.png'));
        // const response = await fetch('https://thumbor.readthedocs.io/en/latest/_images/logo-thumbor.png');
        // const data = await response.buffer();
        it('is an function', () => {
            expect(upload.create).to.be.an('function');
        });
        it('with unsupported media type', done => {
            upload.create('image.png', 'image/png', 'image.png')
                .then(({ status }) => {
                    expect(status).to.equal(415);
                    done();
                }).catch((error) => done(error))
        });
        it('with success', done => {
            upload.create(data, 'image/png', 'image.png')
                .then(({ status, headers }) => {
                    console.log('headers', typeof headers, headers)
                    console.log('location', typeof headers.get('location'), headers.get('location'))
                    expect(status).to.equal(201);
                    // expect(headers).to.be.an('object');
                    expect(headers.get('location')).to.be.an('string');
                    done();
                }).catch((error) => done(error))
        });
    });
});