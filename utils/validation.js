export const validation = {
  text: {
    presence: {
      message: '필수 항목 입니다, 빈칸을 채워 주세요.'
    },
    length: {
      minimum: {
        val: 5,
        message: 'At least 5 characters'
      }
    }
  }
}

export function validate(nameField, value){
  let resp = [null, null];


  if(validation.hasOwnProperty(nameField))
  {
    let v = validation[nameField]
    
    if(value == '' || value == null){
      resp[0] = false
      resp[1] = v['presence']['message']
    }else if(v.hasOwnProperty('format') && !v['format']['pattern'].test(value)){
      resp[0] = false
      resp[1] = l['format']['message']
    }else{
      resp[0] = true
    }
  }else{
    resp[0] = true
  }

  return resp;
}
