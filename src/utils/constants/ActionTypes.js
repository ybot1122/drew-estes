/**
  definition of actions that are dispatched  
**/

const ActionTypes = {
  /** 
    {
      formStatus: <STATUS>
      formData: {
        name: <String>,
        email: <String
      },
      errMesage: <String>
    } 
  **/
  UPDATE_MAILING_LIST_FORM      : 'UPDATE_MAILING_LIST_FORM',
  /**
    {
      sortBy: <String> alphabetically | newest | oldest,
      searchFor: <String>
    }
  **/
  UPDATE_ARTICLE_LIST_SEARCH    : 'UPDATE_ARTICLE_LIST_SEARCH',
};

export default ActionTypes;