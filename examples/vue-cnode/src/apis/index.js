const superagent = require('superagent');

export const getNickname = () => {
  return new Promise((resolve, reject) => {
    superagent
      .get('/cgi/getNickname')
      .set('Accept', 'application/json')
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(ret.text);
      });
  });
};

export const getNodes = () => {
  return new Promise((resolve, reject) => {
    superagent
      .get('/cgi/getNodes')
      .set('Accept', 'application/json')
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(ret.text).nodes.map(node => {
          return decodeURIComponent(node)
        }));
      });
  });
};

export const getCount = (info) => {
  return new Promise((resolve, reject) => {
    //var query = { "tm_range": { "begin": 1509494400, "end": 1509494400 }, "nodes": ["音乐"], "pid": 0, "din": "", "page": { "page": 1, "size": 1000 } };
    superagent.post('/cgi/getCount').send(info).end((err, ret) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(ret.text));
    });
  });
};

export const getWater = (info) => {
  return new Promise((resolve, reject) => {
    superagent.post('/cgi/getWater').send(info).end((err, ret) => {
      // if (err) {
      //   reject(err);
      // }
      // resolve(JSON.parse(ret.text));

      let water = JSON.parse(ret.text).water
      // water.map(item => {
      //   item.query_txt_note = "你喜欢听什么歌"
      //   item.asr_note = 0
      //   item.nlp_note = 2
      //   item.nlp_wrong_types = ['机器问答', '意图']
      //   item.skill_note = '音乐'
      //   // item.skill_note = ''
      //   // item.intent_note = '闹钟查询'
      //   item.intent_note = ''
      //   item.skill_has_content = 1
      //   item.control_id = ''
      //   item.control_value = 0.12
      //   item.slot_note = ''
      //   return item
      // })
      resolve({
        water
      });
    });
  });
};

export const getSummary = (info) => {
  return new Promise((resolve, reject) => {
    superagent
      .post('/cgi/getSummary')
      .send(info)
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(ret.text).water_summarys);
      });
  });
};

export const exportData = (info) => {
  return new Promise((resolve, reject) => {
    superagent.post('/cgi/export.csv').send(info).end((err, ret) => {
      if (err) {
        reject(err);
      }
      resolve(ret.text);
    });
  });
};

// 获取全链路统计数据
export const getCost = ({ pid, din, tm_range, node }) => {
  return new Promise((resolve, reject) => {
    superagent.post('/cgi/getCost')
      .send({ pid, din, tm_range, node })
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(ret.text));
      });
  });
}

export const getCostNodes = () => {
  return new Promise((resolve, reject) => {
    superagent.post('/cgi/getCostNodes').end((err, ret) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(ret.text).nodes);
    });
  });
};

export const getQaList = ({ word, pageNo, pageSize }) => {
  return new Promise((resolve, reject) => {
    superagent.post('/node-cgi/oidb')
      .send({
        cmd: "0x1402",
        word: word || '',
        page: {
          uint32No: pageNo || 0,
          uint32Size: pageSize || 0
        }
      })
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(ret.text));
      });
  });
};

export const updateQa = ({ setType, qaItems }) => {
  return new Promise((resolve, reject) => {
    superagent.post('/node-cgi/oidb')
      .send({
        cmd: "0x1403",
        setType,  // 1:添加 2:删除 3:更新
        qaItems
      })
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(ret.text));
      });
  });
};

export const publishQa = (envType) => {
  return new Promise((resolve, reject) => {
    superagent.post('/node-cgi/oidb')
      .send({
        cmd: "0x1405",
        envType // 环境类型 1: 测试,2：正式
      })
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(ret.text));
      });
  });
};

export const hasAccessRight = () => {
  return new Promise((resolve, reject) => {
    superagent
      .get('/cgi/hasAccessRight')
      .set('Accept', 'application/json')
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        if (ret && ret.text) {
          resolve(ret.text);
        }
      });
  });
}

export const getMusicReport = (info) => {
  return new Promise((resolve, reject) => {
    superagent.post('https://easy-mock.com/mock/5b1a44b65475595e0014c31a/example/upload')
      .send(info)
      .end((err, ret) => {
        if (err) {
          reject(err);
        }
        return resolve(JSON.parse(ret.text));
      })
  });
};
