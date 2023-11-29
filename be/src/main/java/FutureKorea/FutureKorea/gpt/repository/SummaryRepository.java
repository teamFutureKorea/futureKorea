package FutureKorea.FutureKorea.gpt.repository;

import FutureKorea.FutureKorea.gpt.domain.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SummaryRepository extends JpaRepository<Summary, Long> {
    Summary findByReportId(@Param("columnId") Long columnId);
}
