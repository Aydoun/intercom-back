exports.welcomeHTML = `
<html>
    <body>
        <p>Welcome Using Intercom</p>
    </body>
</html>
`;

exports.getInviteMarkup = user => `
<html>
    <body>
        <p>${user.name} invites to join intercom</p>
    </body>
</html>
`;
