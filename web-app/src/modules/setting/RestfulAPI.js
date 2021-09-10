function RestfulAPI(props) {
    return {
        homeList: '//'+ window.location.hostname + ':8001/eng/jsonData/homeList.json',
        menus: '//'+ window.location.hostname + ':8001/eng/jsonTplData/getMenus.json',
        working: '//'+ window.location.hostname + ':8001/eng/jsonData/working.json'
    };

}
export default RestfulAPI;