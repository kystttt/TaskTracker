package habbits_tracker.habbits_tracker.secure.jwt;


import habbits_tracker.habbits_tracker.secure.user.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JwtService {

    private final JwtEncoder encoder;
    private final String issuer;
    private final long ttlMinutes;

    public JwtService(
            JwtEncoder encoder,
            @Value("${security.jwt.issuer}") String issuer,
            @Value("${security.jwt.access-ttl-minutes}") long ttlMinutes
    ) {
        this.encoder = encoder;
        this.issuer = issuer;
        this.ttlMinutes = ttlMinutes;
    }

    public String issueAccessToken(UserEntity user) {
        Instant now = Instant.now();
        Instant exp = now.plusSeconds(ttlMinutes * 60);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .issuedAt(now)
                .expiresAt(exp)
                .subject(user.getUsername())
                .claim("userId", user.getId())
                .claim("roles", user.getRoles().stream().map(Enum::name).toList())
                .build();
        var header = JwsHeader.with(MacAlgorithm.HS256).build();
        return encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}

