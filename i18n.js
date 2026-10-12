/* Shoreline Realty  - EN/FR language system (concept demo).
   Dictionary keyed STR[key][lang]; English is the original HTML.
   Handles data-i18n (innerHTML), data-i18n-ph (placeholder) and data-i18n-aria (aria-label). */
(function () {
  "use strict";
  var d = document;
  var LANGS = ["en", "fr"];
  var LABELS = { en: "English", fr: "Français" };

  var STR = {
    "banner": { "fr": "Aperçu conceptuel indépendant, ceci n'est pas un site officiel approuvé" },
    "nav.buy": { "fr": "Acheter" },
    "nav.sell": { "fr": "Vendre" },
    "nav.lease": { "fr": "Louer" },
    "nav.story": { "fr": "Notre histoire" },
    "nav.team": { "fr": "Notre équipe" },
    "nav.contact": { "fr": "Nous joindre" },
    "nav.cta": { "fr": "Évaluation gratuite" },
    "hero.kicker": { "fr": "Port Credit, Mississauga · Courtage boutique" },
    "hero.title": { "fr": "Toujours là <em>pour vous.</em>" },
    "hero.sub": { "fr": "Comme le phare de notre logo, nous sommes toujours là pour vous. Un courtage familial qui aide les familles à acheter, vendre et louer dans Mississauga et la région du Grand Toronto depuis plus de 25 ans." },
    "hero.stat1t": { "fr": "Au service du Grand Toronto" },
    "hero.stat2n": { "fr": "Familial" },
    "hero.stat2t": { "fr": "Courtage boutique" },
    "hero.stat3n": { "fr": "Port Credit" },
    "hero.stat3t": { "fr": "Basé à Mississauga" },
    "search.buy": { "fr": "Acheter" },
    "search.sell": { "fr": "Vendre" },
    "search.lease": { "fr": "Louer" },
    "search.go": { "fr": "Rechercher" },
    "search.placeholder": { "fr": "Ville, quartier ou mot-clé" },
    "marquee": { "fr": "Le courtage familial de Mississauga <i>•</i> Toujours là pour vous <i>•</i>&nbsp;" },
    "who.kicker": { "fr": "Qui sommes-nous" },
    "who.title": { "fr": "Une famille, <em>une promesse.</em>" },
    "who.p1": { "fr": "Fondé par Dagmar et John, Shoreline Realty Corp., Brokerage est un courtage boutique familial à Port Credit. Depuis plus de 25 ans, nous aidons les familles à acheter, vendre et louer des maisons à Mississauga et dans la région du Grand Toronto." },
    "who.p2": { "fr": "Nous bâtissons des relations à vie avec tous nos clients, ce qui nous donne une solide réputation d'excellence. Comme le phare de notre logo, nous sommes toujours là pour vous." },
    "who.cta": { "fr": "Lire notre histoire" },
    "appr.kicker": { "fr": "Notre approche" },
    "appr.title": { "fr": "Comment nous <em>travaillons.</em>" },
    "appr.sub": { "fr": "Quatre promesses simples, une seule norme de service." },
    "appr.01t": { "fr": "Achetez en confiance" },
    "appr.01d": { "fr": "Une expertise des quartiers, pour ne jamais acheter à côté d'un futur chantier." },
    "appr.02t": { "fr": "Vendez à sa juste valeur" },
    "appr.02d": { "fr": "Étude de marché, stratégie de prix et négociation jusqu'à la clôture." },
    "appr.03t": { "fr": "Louez en toute simplicité" },
    "appr.03d": { "fr": "Des locations traitées avec le même soin qu'une vente, pour propriétaires comme locataires." },
    "appr.04t": { "fr": "Géré avec soin" },
    "appr.04d": { "fr": "Une gestion stable et professionnelle qui protège votre investissement." },
    "nb.kicker": { "fr": "Quartiers" },
    "nb.title": { "fr": "Là où nous <em>travaillons.</em>" },
    "nb.sub": { "fr": "Les communautés de Mississauga et du Grand Toronto que nous connaissons le mieux." },
    "nb.pc.t": { "fr": "Port Credit" },
    "nb.pc.d": { "fr": "Notre port d'attache au 92 Lakeshore Road East, un village au bord du lac au cœur de Mississauga." },
    "nb.lv.t": { "fr": "Lakeview" },
    "nb.lv.d": { "fr": "Une communauté que nous servons depuis plus de 25 ans, avec des rapports de marché réguliers." },
    "nb.cl.t": { "fr": "Clarkson" },
    "nb.cl.d": { "fr": "L'un des quartiers de Mississauga que notre équipe connaît rue par rue." },
    "t.kicker": { "fr": "Témoignages" },
    "t.title": { "fr": "Ce que nos clients <em>disent.</em>" },
    "t.sub": { "fr": "Des avis Google authentiques de vrais clients." },
    "t.prev": { "fr": "Précédent" },
    "t.next": { "fr": "Suivant" },
    "cta.title": { "fr": "Vous pensez acheter, vendre ou louer? <em>Parlons-nous.</em>" },
    "cta.sub": { "fr": "Appelez le 905-891-3300, ou passez au 92 Lakeshore Road East, bureau 215, Mississauga." },
    "est.kicker": { "fr": "Évaluation gratuite" },
    "est.title": { "fr": "Quelle est la valeur <em>de votre maison?</em>" },
    "est.sub": { "fr": "Obtenez une estimation instantanée pour votre maison du Grand Toronto. Demandez ensuite une évaluation complète, sans pression, de notre équipe." },
    "est.hood": { "fr": "Quartier" },
    "est.type": { "fr": "Type de propriété" },
    "est.sqft": { "fr": "Superficie intérieure (pi ca)" },
    "est.go": { "fr": "Obtenir mon estimation" },
    "est.result": { "fr": "Fourchette de valeur estimée" },
    "est.disclaimer": { "fr": "Une estimation approximative pour planifier, pas une évaluation officielle. Chaque maison est unique." },
    "est.lead": { "fr": "Demander mon évaluation complète" },
    "est.t_detached": { "fr": "Unifamiliale détachée" },
    "est.t_semi": { "fr": "Unifamiliale jumelée" },
    "est.t_town": { "fr": "Maison en rangée" },
    "est.t_condo": { "fr": "Condo" },
    "list.kicker": { "fr": "Propriétés actuelles" },
    "list.title": { "fr": "Propriétés <em>en vedette.</em>" },
    "list.sample": { "fr": "Propriétés d'exemple pour démonstration." },
    "list.type": { "fr": "Type de propriété" },
    "list.all": { "fr": "Tout" },
    "list.house": { "fr": "Maison" },
    "list.condo": { "fr": "Condo" },
    "list.bungalow": { "fr": "Bungalow" },
    "list.status": { "fr": "Statut" },
    "list.forsale": { "fr": "À vendre" },
    "list.sold": { "fr": "Vendu" },
    "list.empty": { "fr": "Aucune propriété ne correspond à ces filtres. Élargissez votre recherche." },
    "media.kicker": { "fr": "Dans les médias" },
    "media.title": { "fr": "Cités là où <em>ça compte.</em>" },
    "media.sub": { "fr": "Marco Pedri est régulièrement invité à commenter le marché du Grand Toronto par des médias nationaux." },
    "buy.kicker": { "fr": "Achat" },
    "buy.title": { "fr": "Achetez avec <em>des yeux locaux.</em>" },
    "buy.sub": { "fr": "Imaginez acheter une propriété qui semble parfaite, puis découvrir que dans quelques années, vous serez au milieu d'un chantier. Notre expertise des quartiers vous protège de ce genre de surprise." },
    "buy.h2": { "fr": "Comment nous aidons les acheteurs" },
    "buy.s1t": { "fr": "Connaissance des quartiers" },
    "buy.s1d": { "fr": "Nous connaissons les petits détails qui changent la valeur d'une maison, des nouvelles lignes de transport aux projets planifiés." },
    "buy.s2t": { "fr": "Premiers acheteurs bienvenus" },
    "buy.s2d": { "fr": "Des réponses en termes simples, sans pression ni jargon. Nos clients le disent le mieux." },
    "buy.s3t": { "fr": "Investisseurs aussi" },
    "buy.s3d": { "fr": "Propriétaires et investisseurs nous-mêmes, nous évaluons chaque transaction comme si c'était la nôtre." },
    "buy.cta_t": { "fr": "Prêt à commencer vos recherches?" },
    "buy.cta_d": { "fr": "Dites-nous ce que « chez vous » signifie. Nous nous occupons du reste." },
    "buy.cta": { "fr": "Commencer ma recherche" },
    "sell.kicker": { "fr": "Vente" },
    "sell.title": { "fr": "Vendez à sa <em>juste valeur.</em>" },
    "sell.sub": { "fr": "Étude de marché, stratégie de prix, inscription MLS et négociation jusqu'à la clôture. Les petits détails font une grande différence dans la valeur de votre maison, et nous savons où regarder." },
    "sell.h2": { "fr": "Comment nous aidons les vendeurs" },
    "sell.s1t": { "fr": "Stratégie de prix" },
    "sell.s1d": { "fr": "Une étude de marché soignée positionne votre maison pour attirer les bons acheteurs au bon prix." },
    "sell.s2t": { "fr": "Visibilité MLS" },
    "sell.s2d": { "fr": "Votre inscription présentée correctement sur le système MLS et nos canaux de marketing." },
    "sell.s3t": { "fr": "Négociation jusqu'à la clôture" },
    "sell.s3d": { "fr": "Nous restons à vos côtés pour chaque offre, chaque condition et chaque signature." },
    "sell.est_k": { "fr": "Commencez par une estimation instantanée" },
    "lease.kicker": { "fr": "Location" },
    "lease.title": { "fr": "Chaque location mérite <em>toute notre attention.</em>" },
    "lease.sub": { "fr": "Ne vous contentez pas d'un courtage qui ne pense qu'aux ventes. Chez Shoreline Realty, nous comprenons l'importance de trouver un chez-soi, et c'est pourquoi nous aimons prendre en charge les locations." },
    "lease.s1t": { "fr": "Pour les propriétaires" },
    "lease.s1d": { "fr": "Des stratégies de marketing ciblées et une sélection soigneuse des locataires. Louer une propriété reçoit le même soin que la vendre." },
    "lease.s2t": { "fr": "Pour les locataires" },
    "lease.s2d": { "fr": "Un courtier en location vous fait économiser temps et argent, et ouvre la porte à plus de propriétés dans le marché locatif chaud du Grand Toronto." },
    "lease.s3t": { "fr": "Sans pression" },
    "lease.s3d": { "fr": "Nos clients le disent simplement: serviables, réactifs, et jamais poussés à faire une offre." },
    "lease.cta_t": { "fr": "Une location en vue?" },
    "lease.cta_d": { "fr": "Propriétaire ou locataire, commencez par une conversation." },
    "lease.cta": { "fr": "Parlons-nous" },
    "story.kicker": { "fr": "Notre histoire" },
    "story.title": { "fr": "Un courtage familial, <em>hier et aujourd'hui.</em>" },
    "story.sub": { "fr": "Ce qui a commencé comme une agence boutique à Mississauga sert aujourd'hui des familles dans tout l'Ontario, sans perdre sa touche personnelle." },
    "story.p1": { "fr": "Fondé par Dagmar et John, Shoreline Realty Corp., Brokerage dessert la communauté de Lakeview depuis plus de 25 ans. D'un petit courtage indépendant, c'est devenu une firme boutique qui sert la région du Grand Toronto. Marco Pedri, élevé dans le métier depuis sa naissance, perpétue aujourd'hui l'héritage familial comme courtier." },
    "story.p2": { "fr": "Nous bâtissons des relations à vie avec tous nos clients, ce qui nous donne une solide réputation d'excellence dans l'industrie. Comme le phare de notre logo, nous sommes toujours là pour vous." },
    "story.t1": { "fr": "Dagmar Prugler obtient son permis en immobilier." },
    "story.t2": { "fr": "Dagmar ouvre Shoreline Realty Corp., Brokerage à Mississauga." },
    "story.t3": { "fr": "Marco Pedri se joint à la firme familiale comme courtier immobilier." },
    "story.t4": { "fr": "Marco est cité par La Presse Canadienne sur le marché locatif du Grand Toronto, l'une de plusieurs apparitions médiatiques nationales." },
    "team.kicker": { "fr": "Notre équipe" },
    "team.title": { "fr": "La famille derrière <em>la firme.</em>" },
    "team.sub": { "fr": "Trois courtiers, une seule norme: des stratégies soigneusement adaptées à chaque client, et des relations qui durent bien après la clôture." },
    "team.r1": { "fr": "Courtière responsable · Propriétaire" },
    "team.d1": { "fr": "Permis obtenu en 1988, a ouvert le courtage en 1999. Parle anglais et slovaque." },
    "team.r2": { "fr": "Courtier · Cofondateur" },
    "team.d2": { "fr": "A cofondé le courtage avec Dagmar. Spécialités: condos et investissements." },
    "team.r3": { "fr": "Courtier" },
    "team.d3": { "fr": "Né à Toronto et élevé à Mississauga, plongé dans l'immobilier depuis sa naissance. S'est joint comme courtier en 2017 et perpétue l'héritage familial." },
    "contact.kicker": { "fr": "Contact" },
    "contact.title": { "fr": "Passez à <em>Port Credit.</em>" },
    "contact.sub": { "fr": "Appelez, écrivez ou passez nous voir. Notre porte est ouverte." },
    "contact.h2": { "fr": "Visitez ou appelez" },
    "contact.hours": { "fr": "Lundi au dimanche, 9h00 à 21h00" },
    "form.name": { "fr": "Nom" },
    "form.email": { "fr": "Courriel" },
    "form.phone": { "fr": "Téléphone" },
    "form.msg": { "fr": "Message" },
    "form.send": { "fr": "Envoyer le message" },
    "form.done": { "fr": "Merci. Nous vous répondrons sous peu." },
    "foot.explore": { "fr": "Explorer" },
    "foot.follow": { "fr": "Suivre" },
    "faq.k": { "fr": "Vos questions, nos réponses" },
    "buy.h2k": { "fr": "Comment nous aidons les acheteurs" },
    "buy.h2": { "fr": "Trois raisons de <em>nous choisir.</em>" },
    "buy.s1d": { "fr": "Nous connaissons les petits détails qui changent la valeur d'une maison, des nouvelles lignes de transport aux projets planifiés. Cette connaissance locale évite qu'un achat qui semble parfait ne devienne une mauvaise surprise." },
    "buy.s2d": { "fr": "Des réponses en termes simples, sans pression ni jargon. Nos clients le disent le mieux: l'équipe répond patiemment à chaque question et ne précipite jamais une décision." },
    "buy.s3d": { "fr": "Propriétaires et investisseurs nous-mêmes, nous évaluons chaque transaction comme si c'était la nôtre. Chaque transaction est importante, quelle que soit sa taille." },
    "buy.proc_k": { "fr": "Le processus" },
    "buy.proc_t": { "fr": "Du premier appel <em>à la porte d'entrée.</em>" },
    "buy.p1t": { "fr": "La conversation" },
    "buy.p1d": { "fr": "Dites-nous ce que « chez vous » signifie. Budget, quartier, indispensables et petits plus." },
    "buy.p2t": { "fr": "La sélection" },
    "buy.p2d": { "fr": "Des options soigneusement choisies à Mississauga et dans le Grand Toronto, avec des conseils honnêtes sur chacune." },
    "buy.p3t": { "fr": "L'offre" },
    "buy.p3d": { "fr": "Un prix fondé sur une vraie étude de marché, et une négociation qui protège vos intérêts." },
    "buy.p4t": { "fr": "Les clés" },
    "buy.p4d": { "fr": "Nous restons à vos côtés pour chaque condition et chaque signature, jusqu'à la remise des clés." },
    "buy.q": { "fr": "En tant que premier acheteur, il y a beaucoup d'inconnues et j'avais beaucoup de questions. L'équipe de Shoreline Realty a su répondre à toutes mes questions en termes simples. Je recommanderais Shoreline Realty à tout premier acheteur." },
    "buy.qc": { "fr": "Avis Google, août 2021" },
    "buy.faq_t": { "fr": "FAQ des <em>acheteurs.</em>" },
    "buy.f1q": { "fr": "Devrais-je utiliser un courtier pour trouver une maison dans le Grand Toronto?" },
    "buy.f1a": { "fr": "Oui. Dans un marché compétitif, un courtier vous fait économiser temps et argent tout en vous donnant accès à plus de propriétés, y compris certaines que vous ne trouveriez jamais seul." },
    "buy.f2q": { "fr": "Quels secteurs desservez-vous?" },
    "buy.f2a": { "fr": "Mississauga (Port Credit, Lakeview, Clarkson, Erindale, Applewood), Oakville, Burlington, Etobicoke, le centre-ville de Toronto et Hamilton." },
    "buy.f3q": { "fr": "Vais-je me sentir poussé à faire une offre?" },
    "buy.f3a": { "fr": "Non. Nos clients le disent simplement: serviables, réactifs, et jamais poussés à faire une offre. Nous répondons en termes simples et vous décidez." },
    "buy.f4q": { "fr": "Travaillez-vous avec les investisseurs autant qu'avec les familles?" },
    "buy.f4a": { "fr": "Les deux. Propriétaires et investisseurs nous-mêmes, nous évaluons chaque transaction avec le même soin, qu'il s'agisse d'une première maison ou d'un immeuble de placement." },
    "buy.cta2": { "fr": "Commencer ma recherche" },
    "sell.cta": { "fr": "Quelle est la valeur de ma maison?" },
    "sell.est_t": { "fr": "La valeur de votre maison, <em>en quelques secondes.</em>" },
    "sell.est_d": { "fr": "Une estimation approximative pour planifier. Pour une évaluation complète, notre équipe examine les détails qu'aucun algorithme ne peut voir." },
    "sell.strat_k": { "fr": "Stratégie de prix" },
    "sell.strat_t": { "fr": "Petits détails, <em>grande différence.</em>" },
    "sell.strat_d": { "fr": "Nous savons que les petits détails font une grande différence dans la valeur de votre maison. Par exemple, une nouvelle infrastructure de transport en commun peut augmenter considérablement la valeur de votre propriété. Notre étude de marché trouve les détails qui distinguent votre prix." },
    "sell.proc_k": { "fr": "Le processus" },
    "sell.proc_t": { "fr": "De l'inscription <em>au jour de la clôture.</em>" },
    "sell.p1t": { "fr": "Étude de marché" },
    "sell.p1d": { "fr": "Une étude soignée des ventes comparables et des tendances locales, pour un prix ancré dans la réalité." },
    "sell.p2t": { "fr": "Stratégie de prix" },
    "sell.p2d": { "fr": "Positionnée pour attirer les bons acheteurs au bon prix, dès le premier jour sur le marché." },
    "sell.p3t": { "fr": "Inscription MLS" },
    "sell.p3d": { "fr": "Votre maison présentée correctement sur le système MLS et nos canaux de marketing." },
    "sell.p4t": { "fr": "Négociation jusqu'à la clôture" },
    "sell.p4d": { "fr": "Nous restons à vos côtés pour chaque offre, chaque condition et chaque signature, jusqu'à la remise des clés." },
    "sell.q": { "fr": "L'équipe de Shoreline Realty, c'est du sérieux. Mes exigences pour ma maison étaient très particulières, ce qui a créé beaucoup de défis. L'équipe ne s'est jamais découragée et a travaillé sans relâche pour moi. Au final, j'ai emménagé dans la maison de mes rêves au bon prix." },
    "sell.qc": { "fr": "Avis Google, août 2020" },
    "sell.faq_t": { "fr": "FAQ des <em>vendeurs.</em>" },
    "sell.f1q": { "fr": "Combien vaut ma maison?" },
    "sell.f1a": { "fr": "Commencez par l'estimation instantanée ci-dessus, puis demandez une évaluation complète. Nous examinons les ventes comparables, les tendances du quartier et les petits détails qu'un algorithme manque, sans pression et sans obligation." },
    "sell.f2q": { "fr": "Que comprend la vente avec vous?" },
    "sell.f2a": { "fr": "Une étude de marché, une stratégie de prix, une inscription MLS et une négociation jusqu'à la clôture. Une seule équipe vous accompagne tout au long du parcours." },
    "sell.f3q": { "fr": "Dans quels secteurs vendez-vous?" },
    "sell.f3a": { "fr": "Mississauga (Port Credit, Lakeview, Clarkson, Erindale, Applewood), Oakville, Burlington, Etobicoke, le centre-ville de Toronto et Hamilton." },
    "sell.f4q": { "fr": "Pourquoi la stratégie de prix est-elle si importante?" },
    "sell.f4a": { "fr": "Les petits détails font une grande différence dans la valeur de votre maison. Une nouvelle infrastructure de transport, les zones scolaires, même les détails à l'échelle de la rue peuvent faire bouger un prix. Nous savons où regarder." },
    "sell.cta_t": { "fr": "Vous pensez vendre?" },
    "sell.cta_d": { "fr": "Commencez par une conversation sur ce que votre maison pourrait rapporter." },
    "sell.cta2": { "fr": "Parlons-nous" },
    "lease.panels_k": { "fr": "Deux côtés, une seule norme" },
    "lease.panels_t": { "fr": "Propriétaires <em>et</em> locataires." },
    "lease.s1d": { "fr": "Des stratégies de marketing ciblées, y compris les sites de petites annonces et les sites de location, plus une sélection soigneuse des locataires." },
    "lease.s1e": { "fr": "Propriétaires et investisseurs nous-mêmes, nous savons que la location d'une propriété exige le même soin et la même attention aux détails que si elle était vendue." },
    "lease.s2e": { "fr": "Nos clients le disent simplement: serviables, réactifs, et jamais poussés à faire une offre." },
    "lease.marco_k": { "fr": "Votre spécialiste de la location" },
    "lease.marco_t": { "fr": "Marco Pedri, <em>le spécialiste de la location.</em>" },
    "lease.marco_d": { "fr": "Reconnu comme l'un des courtiers en location incontournables du secteur sur Yelp, Marco détient une note de 4,9 sur 44 avis Google. Il passe en revue chaque bail avec vous, ligne par ligne, pour que vous compreniez tout ce que vous signez." },
    "lease.marco_c": { "fr": "Rencontrer Marco" },
    "lease.q": { "fr": "Mon expérience avec l'équipe de Shoreline Realty a été exceptionnelle. Je tiens à remercier Marco Pedri pour son temps lors de ma location la plus récente. Son souci du détail est sans égal. Il s'est assuré que j'étais bien protégé et a passé le bail en revue avec moi pour que je comprenne tout ce qui était écrit. Je ne me suis jamais senti pressé et je suis maintenant dans un endroit que je peux appeler chez moi." },
    "lease.qc": { "fr": "Avis Google, août 2021" },
    "lease.faq_t": { "fr": "FAQ de la <em>location.</em>" },
    "lease.f1q": { "fr": "Devrais-je utiliser un courtier pour trouver une location à Toronto?" },
    "lease.f1a": { "fr": "Oui. Utiliser un courtier en location dans le marché locatif chaud d'aujourd'hui vous fait économiser temps et argent tout en vous donnant accès à plus de propriétés que vous n'en trouveriez seul." },
    "lease.f2q": { "fr": "Aidez-vous les locataires autant que les propriétaires?" },
    "lease.f2a": { "fr": "Les deux. Nous offrons un marketing ciblé et une sélection soigneuse des locataires aux propriétaires, et un accompagnement patient et sans pression aux locataires." },
    "lease.f3q": { "fr": "Dans quels secteurs louez-vous?" },
    "lease.f3a": { "fr": "Mississauga (Port Credit, Lakeview, Clarkson, Erindale, Applewood), Oakville, Burlington, Etobicoke, le centre-ville de Toronto et Hamilton." },
    "lease.f4q": { "fr": "Vais-je me sentir poussé à signer?" },
    "lease.f4a": { "fr": "Jamais. Les clients décrivent Marco comme très réactif et excellent communicateur, heureux de faire plusieurs jours de visites sans jamais les pousser à faire une offre." },
    "lease.cta2": { "fr": "Parlons-nous" },
    "story.about_k": { "fr": "Dans leurs propres mots" },
    "story.about_t": { "fr": "Qui <em>nous sommes.</em>" },
    "story.about": { "fr": "Shoreline Realty Corp., Brokerage est un courtage immobilier à service complet qui aide les familles à acheter, vendre et louer des maisons depuis plus de 35 ans en Ontario. D'une agence immobilière de style boutique à Mississauga, Shoreline Realty s'est étendu pour desservir plusieurs villes en Ontario. Notre croissance ne nous a pas empêchés de fournir des stratégies d'achat et de vente soigneusement adaptées à nos clients. Nous reconnaissons que les besoins immobiliers de chacun sont uniques et que votre plan devrait le refléter. Nous bâtissons des relations à vie avec tous nos clients, ce qui nous donne une solide réputation d'excellence dans l'industrie. Comme le phare de notre logo, nous sommes toujours là pour vous." },
    "story.leg_k": { "fr": "Héritage familial" },
    "story.leg_t": { "fr": "Né <em>dans le métier.</em>" },
    "story.leg_d": { "fr": "Né à Toronto et élevé à Mississauga, Marco Pedri est plongé dans l'immobilier depuis sa naissance. Sa mère et son père étaient tous deux courtiers immobiliers et ont ouvert leur propre courtage, une firme de deux personnes: Shoreline Realty. Aujourd'hui, Marco perpétue l'héritage comme courtier lui-même, à la tête des dernières innovations de la firme." },
    "story.leg_c": { "fr": "Rencontrer la famille" },
    "story.val_k": { "fr": "Ce en quoi nous croyons" },
    "story.val_t": { "fr": "Chaque transaction <em>est importante.</em>" },
    "story.v1t": { "fr": "Des relations pour la vie" },
    "story.v1d": { "fr": "Nous bâtissons des relations à vie avec tous nos clients, ce qui nous donne une solide réputation d'excellence dans l'industrie." },
    "story.v2t": { "fr": "Chaque plan est personnel" },
    "story.v2d": { "fr": "Nous reconnaissons que les besoins immobiliers de chacun sont uniques et que votre plan devrait le refléter." },
    "story.v3t": { "fr": "Le soin d'un propriétaire" },
    "story.v3d": { "fr": "Propriétaires et investisseurs nous-mêmes, nous traitons votre propriété avec le même soin et la même attention aux détails que si elle était vendue." },
    "story.cta_t": { "fr": "Faites partie de l'histoire" },
    "story.cta_d": { "fr": "Achetez, vendez ou louez avec une famille qui vous traite comme l'un des siens." },
    "story.cta": { "fr": "Nous joindre" },
    "team.press_k": { "fr": "Dans les médias" },
    "team.press_t": { "fr": "Cités <em>à l'échelle nationale.</em>" },
    "team.press_d": { "fr": "Les commentaires de Marco sur le marché ont paru dans des médias nationaux couvrant le marché locatif du Grand Toronto et les tendances nationales des ventes." },
    "team.d1": { "fr": "Permis obtenu en 1988, Dagmar a ouvert Shoreline Realty Corp., Brokerage en 1999 et le dirige depuis. Un courtage boutique au vrai sens du terme: personnel, soigneux, et bâti sur les relations." },
    "team.d2": { "fr": "John a cofondé le courtage avec Dagmar, le faisant passer d'une firme de deux personnes à un boutique du Grand Toronto. Ses spécialités incluent les condos et les investissements." },
    "team.d3": { "fr": "Né à Toronto et élevé à Mississauga, Marco est plongé dans l'immobilier depuis sa naissance. Il s'est joint à la firme familiale comme courtier en 2017 et mène aujourd'hui ses innovations. Spécialiste de la location, il détient une note de 4,9 sur 44 avis Google et est cité par les médias nationaux sur le marché du Grand Toronto." },
    "team.t1a": { "fr": "Anglais" },
    "team.t1b": { "fr": "Slovaque" },
    "team.t1c": { "fr": "Depuis 1988" },
    "team.t2a": { "fr": "Condos" },
    "team.t2b": { "fr": "Investissements" },
    "team.t2c": { "fr": "Cofondateur" },
    "team.t3a": { "fr": "Spécialiste de la location" },
    "team.t3b": { "fr": "Note de 4,9" },
    "team.t3c": { "fr": "647-920-1314" },
    "team.q": { "fr": "Quelque chose d'aussi simple que de changer une pancarte de « À vendre » à « Vendu » ou de « À louer » à « Loué » m'enthousiasme et me fait sourire. C'est un travail bien fait et j'ai rendu un client heureux." },
    "team.qc": { "fr": "Marco Pedri, courtier" },
    "team.cta_t": { "fr": "Travaillez avec la famille" },
    "team.cta_d": { "fr": "Appelez le 905-891-3300 ou envoyez un message. Nous répondons." },
    "team.cta": { "fr": "Nous joindre" },
    "contact.soc_k": { "fr": "Suivez-nous" },
    "contact.faq_t": { "fr": "Avant de <em>nous joindre.</em>" },
    "contact.f1q": { "fr": "Où êtes-vous situés?" },
    "contact.f1a": { "fr": "92 Lakeshore Road East, bureau 215, à Port Credit, Mississauga, Ontario. Nous desservons Mississauga, Oakville, Burlington, Etobicoke, le centre-ville de Toronto et Hamilton." },
    "contact.f2q": { "fr": "Quand puis-je vous joindre?" },
    "contact.f2a": { "fr": "Du lundi au dimanche, de 9h00 à 21h00, au 905-891-3300. Ou envoyez un message en tout temps et nous vous répondrons." },
    "contact.f3q": { "fr": "Travaillez-vous avec les premiers acheteurs et les locataires?" },
    "contact.f3a": { "fr": "Absolument. Les premiers acheteurs reçoivent des conseils patients et sans jargon, et les locataires reçoivent le même soin que les acheteurs. Nos clients mentionnent constamment n'avoir ressenti aucune pression." },
    "contact.f4q": { "fr": "Comment savoir combien vaut ma maison?" },
    "contact.f4a": { "fr": "Essayez l'estimation instantanée sur notre page Vendre, puis demandez une évaluation complète. C'est gratuit, sans obligation." },
    "contact.cta_t": { "fr": "Vous préférez en parler?" },
    "contact.cta_d": { "fr": "Appelez le 905-891-3300. Une vraie personne répond." },
    "contact.cta": { "fr": "Appeler" }
  };

  function saved() {
    try {
      var s = localStorage.getItem("shoreline_lang");
      if (s && LANGS.indexOf(s) >= 0) return s;
    } catch (e) {}
    return "en";
  }

  function applyHtml(el, key, lang) {
    var entry = STR[key];
    if (lang === "en") {
      var orig = el.getAttribute("data-i18n-en");
      if (orig !== null) el.innerHTML = orig;
    } else if (entry && entry[lang] !== undefined) {
      if (el.getAttribute("data-i18n-en") === null) {
        el.setAttribute("data-i18n-en", el.innerHTML);
      }
      el.innerHTML = entry[lang];
    }
  }

  function applyPh(el, key, lang) {
    var entry = STR[key];
    if (lang === "en") {
      var orig = el.getAttribute("data-i18n-ph-en");
      if (orig !== null) el.setAttribute("placeholder", orig);
    } else if (entry && entry[lang] !== undefined) {
      if (el.getAttribute("data-i18n-ph-en") === null) {
        el.setAttribute("data-i18n-ph-en", el.getAttribute("placeholder") || "");
      }
      el.setAttribute("placeholder", entry[lang]);
    }
  }

  function applyAria(el, key, lang) {
    var entry = STR[key];
    if (lang === "en") {
      var orig = el.getAttribute("data-i18n-aria-en");
      if (orig !== null) el.setAttribute("aria-label", orig);
    } else if (entry && entry[lang] !== undefined) {
      if (el.getAttribute("data-i18n-aria-en") === null) {
        el.setAttribute("data-i18n-aria-en", el.getAttribute("aria-label") || "");
      }
      el.setAttribute("aria-label", entry[lang]);
    }
  }

  function apply(lang, silent) {
    d.documentElement.setAttribute("lang", lang === "fr" ? "fr-CA" : "en-CA");
    var els = d.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) applyHtml(els[i], els[i].getAttribute("data-i18n"), lang);
    var phs = d.querySelectorAll("[data-i18n-ph]");
    for (var k = 0; k < phs.length; k++) applyPh(phs[k], phs[k].getAttribute("data-i18n-ph"), lang);
    var ars = d.querySelectorAll("[data-i18n-aria]");
    for (var m = 0; m < ars.length; m++) applyAria(ars[m], ars[m].getAttribute("data-i18n-aria"), lang);
    var sels = d.querySelectorAll(".x-langsel");
    for (var j = 0; j < sels.length; j++) { sels[j].value = lang; }
    if (!silent) {
      try { localStorage.setItem("shoreline_lang", lang); } catch (e) {}
    }
    setLang._current = lang;
    if (window.__shorelineCount) window.__shorelineCount();
  }

  function setLang(lang, silent) {
    if (!lang || LANGS.indexOf(lang) < 0) lang = "en";
    apply(lang, silent);
  }
  setLang._current = saved();
  setLang.current = function () { return setLang._current || "en"; };

  function initSels() {
    var sels = d.querySelectorAll(".x-langsel");
    for (var i = 0; i < sels.length; i++) {
      (function (sel) {
        sel.innerHTML = "";
        LANGS.forEach(function (l) {
          var o = d.createElement("option");
          o.value = l; o.textContent = LABELS[l];
          sel.appendChild(o);
        });
        sel.value = setLang.current();
        sel.addEventListener("change", function () { setLang(sel.value); });
      })(sels[i]);
    }
  }

  window.__shorelineLang = setLang;

  function boot() {
    initSels();
    apply(setLang.current(), true);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
