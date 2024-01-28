import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useFlip() {
  const [state, setState] = useState(false);
  const flip = useCallback(() => setState(state => !state), []);
  return [state, flip];
}

/**
 * @callback MakeRequest 
 * @param {Object} variables
 * 
 * @typedef {Object} UseAxios
 * @property {string} url
 * 
 * @param {UseAxios} param0 
 * @returns {any[], (variables?: Object) => void, () => void}
 */
export function useAxios ({url, onFilter = (d) => d}) {
  const [data, setData] = useStorage(url, [])
  const makeRequest = useCallback((variables = null) => {
    let newUrl = url
    if (variables !== null) {
      newUrl = Object.keys(variables).reduce((s, name) => {
        return s.replace(`{${name}}`, variables[name])
      }, url)
    }
    axios.get(newUrl).then(res => {
      setData((v) => [...v, onFilter({...res.data})])
    })
  }, [url, onFilter])
  const clearData = useCallback(() => setData([]), [])
  return [data, makeRequest, clearData]
}

export function useStorage(key, defaultValue) {
  const [state, setState] = useState(defaultValue)

  const setStorage = useCallback((value) => {
    const resolvedValue = typeof value === 'function' ? value(state) : value
    setState(resolvedValue)
    setStorageItem(key, resolvedValue)
  }, [key, state])

  useEffect(() => {
    const value = getStorageItem(key)
    if (value === null) {
      return
    }
    setState(value)
  }, [key])

  return [state, setStorage]
}

function getStorageItem(key) {
  const value = localStorage.getItem(key)
  try {

    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

function setStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}