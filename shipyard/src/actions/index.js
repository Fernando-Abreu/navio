/*
 *  action types
 */

export const SET_DATA = 'SET_DATA';
export const SET_ATTRIBUTES = 'SET_ATTRIBUTES';
export const SET_ATTRIBUTE_COLOR = 'SET_ATTRIBUTE_COLOR';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HANDLE_OK = 'HANDLE_OK';
export const HANDLE_CANCEL = 'HANDLE_CANCEL';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const TOGGLE_DATA_LOADED = 'TOGGLE_DATA_LOADED';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const RESET_DATA = 'RESET_DATA';
export const CHANGE_CHECK_STATUS = 'CHANGE_CHECK_STATUS';
export const CHANGE_TYPE_STATUS = 'CHANGE_TYPE_STATUS';
export const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';
export const UPDATE_FILTERED_DATA = 'UPDATE_FILTERED_DATA';
export const TOGGLE_SETTINGS_VISIBLE = 'TOGGLE_SETTINGS_VISIBLE';
export const TOGGLE_COLOR_VISIBLE = 'TOGGLE_COLOR_VISIBLE';
export const DELETE_COMPONENT_CLASS = 'DELETE_COMPONENT_CLASS';
export const ADD_COMPONENT_CLASS = 'ADD_COMPONENT_CLASS';
export const SET_COMPONENT_CLASSES = 'SET_COMPONENT_CLASSES';
export const SWAP_COMPONENT_CLASSES = 'SWAP_COMPONENT_CLASSES';

/*
 * complementary functions
 */
const getAttributesType = (data, atts, ids) => {
  const seq = 'sequential';
  const cat = 'categorical';
  let count = 0;
  for (const prop in data[1]) {
    const attr =data[1][prop];
    if (atts[count].name.includes('id') || atts[count].name.includes('key')) {
      atts[count].id = true;
      ids.push(atts[count].name);
    }
    const notNumber = isNaN(attr);
    const isDate = checkDate(attr);
    if (!notNumber) {
      atts[count].type = seq;
      atts[count].data = 'number';

      let min = data[0][prop];
      let max = data[0][prop];
      for (var i = data.length - 1; i >= 0; i--) {
        if (data[i][prop] > max) {
          max = data[i][prop];
        } if ( data[i][prop] < min) {
          min = data[i][prop];
        }
      }
      atts[count].min = min;
      atts[count].max = max;
    } else if (isDate) {
      atts[count].type = seq;
      atts[count].data = 'date';

      let min = data[0][prop];
      let max = data[0][prop];
      for (var j = data.length - 1; j >= 0; j--) {
        if (data[j][prop] > max) {
          max = data[j][prop];
        } if ( data[j][prop] < min) {
          min = data[j][prop];
        }
      }

    } else {
       atts[count].type = cat;
       atts[count].data = 'string';
    }
    count++;
  }
};

/*
 * action creators
 */
export const setData = data => {
  const source = data.slice(0);
  /* Creates an empty array that will contain the metadata of the attributes */
  const atts = [];
  const ids = [];
  for (let prop in data[0]) {
    const attribute = {};
    attribute.name = prop;
    attribute.checked = true;
    attribute.type = '';
    attribute.id = false;
    attribute.settings = false;
    atts.push(attribute);
  }
  getAttributesType(data, atts, ids);
  data.forEach(row => {
    atts.forEach(att=> {
      if (att.data === "date") {
        let mydate = new Date(row[att.name]);
        if (isNaN(mydate.getDate())) {
          row[att.name] = null;
        } else {
          row[att.name] = mydate;
        }
      }
      else if (att.data=== "number") {
        let mynumber = +row[att.name];
        if (isNaN(mynumber)) {
          row[att.name] = null;
        } else {
          row[att.name] = mynumber;
        }
      }
    });
  });
  return {
    type: SET_DATA,
    source,
    data,
    atts,
  };
};
export const setComponentClasses = attributes => ({
  type: SET_COMPONENT_CLASSES,
  attributes,
});
const setUI = atts => {
  return function (dispatch) {
    console.log(atts, 'atts setui')
    dispatch(setComponentClasses(atts))
  }
}
const checkDate = (attr) => {
  const mydate = new Date(attr);
  if (isNaN(mydate.getDate())) {
    return false;
  }
  return true;
}

export const showModal = () => ({ type: SHOW_MODAL });

export const handleOk = () => {};

export const handleCancel = () => {};

export const toggleLoading = () => ({ type: TOGGLE_LOADING });

export const toggleDataLoaded = () => ({ type: TOGGLE_DATA_LOADED });

export const resetData = () => ({ type: RESET_DATA });

export const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR });

export const changeCheckStatus = (attribute, status) => ({
  type: CHANGE_CHECK_STATUS,
  attribute,
  status,
});

export const changeTypeStatus = (attribute, status, callback) => ({
  type: CHANGE_TYPE_STATUS,
  attribute,
  status,
});

export const updateAttribute = () => ({ type: UPDATE_ATTRIBUTE });

export const updateFilteredData = exportData => ({ type: UPDATE_FILTERED_DATA, exportData });

export const toggleSettingsVisible = (index, visible) => ({
  type: TOGGLE_SETTINGS_VISIBLE,
  index,
  visible,
});

export const setAttributes = attributes => ({
  type: SET_ATTRIBUTES,
  attributes,
});

export const setAttributeColor = (color, event, index) => ({
  type: SET_ATTRIBUTE_COLOR,
  color,
  event,
  index,
});

export const toggleColorVisible = index => ({
  type: TOGGLE_COLOR_VISIBLE,
  index,
});

export const deleteLastComponentClass = index => ({
  type: DELETE_COMPONENT_CLASS,
  index,
});

export const addComponentClass = (className, index) => ({
  type: ADD_COMPONENT_CLASS,
  className,
  index,
})

export const swapComponentClasses = (i, j) => ({
  type: SWAP_COMPONENT_CLASSES,
  i,
  j,
})