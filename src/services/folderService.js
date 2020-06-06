import FolderProvider from "../providers/folder";
import Tag from "../models/tag";
import FolderModel from "../models/folder";

const FolderService = {
  getFolders: function () {
    return FolderProvider.fetchFolders().then(response => {
      const responseFolders = response.data;
      return responseFolders.map(folder => {
        let tags = folder.tags.map(tag => {
          return new Tag(tag._id, tag.name);
        });
        return new FolderModel(folder.id, folder.name, tags);
      });

    });
  },
};

export default FolderService;