/**
 * vuex store 生成器 v1.1.0
 * 暴露4个生成器：state, getters, mutations, actions
 * 暴露3种action: start, perform, cancel
 * 主要用于封装状态机，底层还是vuex state, getters, mutations, actions
 * http://vuex.vuejs.org/
 */
const MUTATIONS = {
  START: 'start',
  PERFORM: 'perform',
  DONE: 'done',
  FAIL: 'fail',
  CANCEL: 'cancel'
}

export const STAGES = {
  PENDING: 'Pending',
  STARTED: 'Started',
  LOADING: 'Loading',
  DONE: 'Done',
  FAIL: 'Fail'
}

const getMutationTypes = (stateName) => {
  return {
    START: `${stateName}_${MUTATIONS.START}`,
    PERFORM: `${stateName}_${MUTATIONS.PERFORM}`,
    DONE: `${stateName}_${MUTATIONS.DONE}`,
    FAIL: `${stateName}_${MUTATIONS.FAIL}`,
    CANCEL: `${stateName}_${MUTATIONS.CANCEL}`
  }
}

export const generateState = () => {
  return {
    stage: STAGES.PENDING,
    params: null,
    data: null,
    error: null
  }
}

// v1.2 实际调用的过程中 state 中重复的内容太多了，直接自动生成
export const generateAllStates = (stateName) => {
  const keys = stateName && Object.keys(stateName)
  if (!keys) return {}
  let state = {}
  keys.forEach(key => {
    state[`${stateName[key]}`] = generateState(`${stateName[key]}`)
  });
  return state
}

export const generateGetters = (stateName) => {
  return {
    [`${stateName}_data`]: state => state[stateName].data,
    [`${stateName}_stage`]: state => state[stateName].stage,
    [`${stateName}_params`]: state => state[stateName].params,
    [`${stateName}_error`]: state => state[stateName].error
  }
}

// v1.2 实际调用的过程中 getters 中重复的内容太多了，直接自动生成
export const generateAllGetters = (stateName) => {
  const keys = stateName && Object.keys(stateName)
  if (!keys) return {}
  let getters = {}
  keys.forEach(key => {
    getters = {
      ...getters,
      ...generateGetters(`${stateName[key]}`)
    }
  });
  return getters
}

export const generateMutations = (stateName) => {
  const types = getMutationTypes(stateName)
  return {
    [types.START]: (state, params) => {
      state[stateName].error = null
      state[stateName].stage = STAGES.STARTED
      if (params) {
        state[stateName].params = params
      }
    },
    [types.PERFORM]: (state, params) => {
      state[stateName].error = null
      state[stateName].stage = STAGES.LOADING
      if (params) {
        state[stateName].params = params
      }
    },
    [types.CANCEL]: (state) => {
      state[stateName].stage = STAGES.PENDING
    },
    [types.DONE]: (state, data) => {
      state[stateName].stage = STAGES.DONE
      state[stateName].data = data
    },
    [types.FAIL]: (state, err) => {
      state[stateName].stage = STAGES.FAIL
      state[stateName].error = err
    }
  }
}

// v1.2 实际调用的过程中 mutations 中重复的内容太多了，直接自动生成
export const generateAllMutations = (stateName) => {
  const keys = stateName && Object.keys(stateName)
  if (!keys) return {}
  let mutations = {}
  keys.forEach(key => {
    mutations = {
      ...mutations,
      ...generateMutations(`${stateName[key]}`)
    }
  });
  return mutations
}

export const generateActions = (stateName, {
    createPerformPromise
  }) => {
  const types = getMutationTypes(stateName)
  return {
    [`${stateName}_start`]({ commit }, params) {
      commit(types.START, params)
    },
    async [`${stateName}_perform`]({ commit, getters }, params) {
      commit(types.PERFORM, params)
      await createPerformPromise(params)
        .then((data) => {
          commit(types.DONE, data)
        })
        .catch((err) => {
          commit(types.FAIL, err)
        })
      return {
        data: getters[`${stateName}_data`] || {},
        error: getters[`${stateName}_error`] || {}
      }
    },
    // 手动更新action, 直接替换state tree里的data字段
    [`${stateName}_update`]({ commit }, data) {
      commit(types.DONE, data)
    },
    // 取消正在进行中的异步操作
    [`${stateName}_cancel`]({ commit, state }) {
      if (state[stateName].stage === STAGES.LOADING) return;
      commit(types.CANCEL)
    }
  }
}


// todo
// 1. 直接 export 已存在的   state,mutations,actions,getters, namespace 默认开启
// 2. 直接导入 vuex modules 模块 mutations 模块 getters 模块等
// 3. ts 代码提示
// 4. 单元测试
// 5. 感觉 getter 太多了没有必要，声明式 过滤一部分