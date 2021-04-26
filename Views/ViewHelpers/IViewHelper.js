//Interface Class for ViewHelpers
    class IViewHelper {
        getEntity(request) {};
        setView(result, request, response) {};
    };

//Exports
    module.exports = IViewHelper;