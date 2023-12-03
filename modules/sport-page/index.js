module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Sport Page',
    pluralLabel: 'Sport Pages',
  },
  fields: {
    add: {},
    group: {}
  },
  methods(self) {
    return {
      async teamPage(req) {

        // We'll try to find the piece as an ordinary reader
        debugger
        let doc;
        let previous;
        let next;

        await findAsReader();
        if (!doc) {
          req.notFound = true;
          return;
        }

        self.setTemplate(req, 'team');
        req.data.piece = doc;
        req.data.previous = previous;
        req.data.next = next;
        await self.beforeShow(req);

        async function findAsReader() {
          const query = self.showQuery(req);
          doc = await query.toObject();
        }

        async function findAsEditor() {
          // TODO: Is `contextual` still relevant?
          if (doc || !req.user || !self.pieces.contextual) {
            return;
          }
          // Use findForEditing to allow subclasses to extend the set of filters that
          // don't apply by default in an editing context. -Tom
          const query = self.pieces.findForEditing(req, { slug: req.params.slug });
          doc = await query.toObject();
        }

        async function findPrevious() {
          if (!self.options.previous) {
            return;
          }
          if (!doc) {
            return;
          }
          const query = self.indexQuery(req);
          previous = await query.previous(doc).applyBuilders(typeof self.options.previous === 'object' ? self.options.previous : {}).toObject();
        }

        async function findNext() {
          if (!self.options.next) {
            return;
          }
          if (!doc) {
            return;
          }
          const query = self.indexQuery(req);
          next = await query.next(doc).applyBuilders(typeof self.options.next === 'object' ? self.options.next : {}).toObject();
        }
    },
    dispatchAll() {
      self.dispatch('/', self.indexPage);
      self.dispatch('/:slug', self.showPage);
      self.dispatch('/:slug/:team', self.teamPage);
    },
  }
  }
};