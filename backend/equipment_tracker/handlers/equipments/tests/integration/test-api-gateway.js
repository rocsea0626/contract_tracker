"use strict"

const chai = require("chai");
const axios = require("axios");
const testingUtils = require("../../../../testing-utils/testing-utils")
const expect = chai.expect;


describe("Test (GET) /equipment/search?limit={limit}", ()=>{
  let apiEndpoint;

  before(async () => {
    apiEndpoint = await testingUtils.getApiEndpoint()
    console.log("apiEndpoint: %s", apiEndpoint)
  })

  describe("No initial data", function () {
    it("Successful, returns 200, OK, empty response", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await axios.get(getPath, {
          params: {
            limit: 3
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(0)

      }catch (err){
        console.log(err)
        throw err
      }
    })
  })

  describe("With initial data", function () {
    before(async () => {
      const path = apiEndpoint + "equipment"
      const e1 = {
        EquipmentNumber: "it_get_eq_1",
        Address: "address_1",
        StartDate: "start_date_1",
        EndDate: "end_date_1",
        Status: "Running",
      }
      const e2 = {
        EquipmentNumber: "it_get_eq_2",
        Address: "address_2",
        StartDate: "start_date_2",
        EndDate: "end_date_2",
        Status: "Stopped",
      }
      const e3 = {
        EquipmentNumber: "it_get_eq_3",
        Address: "address_3",
        StartDate: "start_date_3",
        EndDate: "end_date_3",
        Status: "Stopped",
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await Promise.all([
        axios.post(path, e1, config),
        axios.post(path, e2, config),
        axios.post(path, e3, config)
      ])
      // console.log(res)
      expect(res[0].status).to.equal(201)
      expect(res[1].status).to.equal(201)
      expect(res[2].status).to.equal(201)

    })

    after(async () => {
      const path1 = apiEndpoint + "equipment/it_get_eq_1"
      const path2 = apiEndpoint + "equipment/it_get_eq_2"
      const path3 = apiEndpoint + "equipment/it_get_eq_3"
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }


      const res = await Promise.all([
        axios.delete(path1, config),
        axios.delete(path2, config),
        axios.delete(path3, config)
      ])
      // console.log(res)
      expect(res[0].status).to.equal(200)
      expect(res[1].status).to.equal(200)
      expect(res[2].status).to.equal(200)
    })

    it("Successful, returns 200, OK", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await axios.get(getPath, {
          params: {
            limit: 3
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(3)

      }catch (err){
        console.log(err)
        throw err
      }
    })

    it("Successful, returns 200, OK, limit > 3", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await axios.get(getPath, {
          params: {
            limit: 10
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(3)

      }catch (err){
        console.log(err)
        throw err
      }
    })

    it("Successful, returns 200, OK, limit < 3", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await axios.get(getPath, {
          params: {
            limit: 1
          }
        })
        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(1)

      }catch (err){
        console.log(err)
        throw err
      }
    })

    it("Failed, returns 400, bad request limit=0", async () => {
      try{
        const getPath = apiEndpoint + 'equipment/search'
        const res = await axios.get(getPath, {
          params: {
            limit: -1
          }
        })
        expect(res).to.be.null

      }catch (err){
        expect(err.response.status).to.equal(400)
      }
    })

  });


})
